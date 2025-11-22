import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Edit2, X } from "lucide-react";

import CountryDropdown from "./CountryDropdown";
import TableFilter from "./TableFilter";
import "./styles.css";

const API_BASE = "https://685013d7e7c42cfd17974a33.mockapi.io";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    country: "",
    countryId: "",
  });

  // ========== LOAD DATA ==========
  useEffect(() => {
    (async () => {
      try {
        const [taxRes, countryRes] = await Promise.all([
          fetch(`${API_BASE}/taxes`),
          fetch(`${API_BASE}/countries`),
        ]);

        const [taxes, countryList] = await Promise.all([
          taxRes.json(),
          countryRes.json(),
        ]);

        setData(taxes);
        setCountries(countryList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

// DISTINCT + NORMALIZED COUNTRY FILTER OPTIONS
const filterOptions = useMemo(() => {
  const seen = new Set();
  const result = [];

  data.forEach((row) => {
    const name = (row.country || "").trim();
    if (!name) return;

    const normalized =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  });

  return result;   // ["Bhutan", "Hoho", "Iraq", "Norway", ...]
}, [data]);

 // ========== APPLY FILTER ==========
const filteredData = useMemo(() => {
  if (filteredIds.length === 0) return data;

  return data.filter((row) => {
    const normalized =
      row.country?.charAt(0).toUpperCase() + row.country?.slice(1).toLowerCase();

    return filteredIds.includes(normalized);
  });
}, [data, filteredIds]);


  // ========== OPEN EDIT ==========
  const handleEdit = (row) => {
    const r = row.original;

    const matched =
      countries.find((c) => c.id === r.countryId) ||
      countries.find((c) => c.name === r.country);

    setEditingRow(r);

    setEditForm({
      name: r.name || "",
      countryId: matched?.id || r.countryId || "",
      country: matched?.name || r.country || "",
    });

    setIsModalOpen(true);
  };

  // ========== SAVE ==========
  const save = async () => {
    if (!editForm.name.trim() || !editForm.countryId) return;

    setIsSaving(true);

    const updated = {
      ...editingRow,
      name: editForm.name,
      country: editForm.country,
      countryId: editForm.countryId,
    };

    try {
      await fetch(`${API_BASE}/taxes/${editingRow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setData((prev) =>
        prev.map((row) => (row.id === editingRow.id ? updated : row))
      );
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // ========== TABLE COLUMNS ==========
  const columnHelper = createColumnHelper();

  const columns = [
    // NOTE: Entity column shows API "name" field (Marco Huel etc)
    columnHelper.accessor("name", {
      header: "Entity",
      cell: (info) => (
        <span className="entity-link">{info.getValue() || "-"}</span>
      ),
    }),

    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => {
        const g = info.getValue()?.toLowerCase();
        if (!g) return null;
        return (
          <span className={`pill ${g === "male" ? "pill-male" : "pill-female"}`}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </span>
        );
      },
    }),

    columnHelper.accessor("requestDate", {
      header: "Request date",
      cell: (info) => {
        const d = info.getValue();
        if (!d) return "-";
        return new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
    }),

    columnHelper.accessor("country", {
      header: () => (
        <div className="country-header">
          <span>Country</span>
          <TableFilter
            options={filterOptions}
            onFilterChange={setFilteredIds}
          />
        </div>
      ),
      cell: (info) => info.getValue() || "-",
    }),

    columnHelper.display({
      id: "edit",
      header: "",
      cell: ({ row }) => (
        <button className="edit-btn" onClick={() => handleEdit(row)}>
          <Edit2 size={16} />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="page">
        <div className="loading-text">Loading…</div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="table-wrapper scale-in">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="row-anim">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {isModalOpen && (
        <div className="modal-overlay fade-in">
          <div className="modal scale-up">
            <div className="modal-header">
              <h3>Edit Customer</h3>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="field">
                <label>
                  Name <span className="required">*</span>
                </label>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Country</label>
                <CountryDropdown
                  countries={countries}
                  selectedId={editForm.countryId}
                  onSelect={(c) =>
                    setEditForm({
                      ...editForm,
                      countryId: c.id,
                      country: c.name,
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={save}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
