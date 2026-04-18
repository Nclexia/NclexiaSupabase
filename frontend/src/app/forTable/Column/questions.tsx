"use client"

import { ColumnDef } from '@tanstack/react-table';
import { QuestionData } from '@/app/types';
import { Trash } from "lucide-react";

export const columns: ColumnDef<QuestionData>[] = [

  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} </div>,
  },

  {
    accessorKey: "scenario_id",
    header: () => <div className="text-center">Scenario ID</div>,
    cell: ({ getValue }) => <div className="text-center font-bold"> {getValue<string>()} </div>,
  },

  {
    accessorKey: "ques",
    header: () => <div className="text-center">Question</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "format",
    header: () => <div className="text-center">Format</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "ans",
    header: () => <div className="text-center">Answer</div>,
    cell: ({ getValue }) => {
      const value = getValue<any>();

      let display: string;
      if (typeof value === "string") display = value;
      else if (Array.isArray(value)) display = JSON.stringify(value);
      else if (typeof value === "object" && value !== null) display = JSON.stringify(value);
      else display = "";


      return <div className="text-center">{display}</div>;
    }
  },

  {
    accessorKey: "opt",
    header: () => <div className="text-center">Option</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>() || "Null"}</div>
    ),

  },
  {
    accessorKey: "rationale",
    header: () => <div className="text-center">Rationale</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,

  },
  {
    accessorKey: "delete",
    header: () => <div className="text-center">Delete Row</div>,
    cell: ({ row }) => {
      const onDelete = async () => {
        try {
          const res = await fetch('/api/admin/deleteQuesByID', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ques_id: (row.original as any).id,
            }),
          });
      
          const result = await res.json();
      
          if (!res.ok) {
            alert(result.error || 'Delete failed');
            return;
          }
      
          alert('Deleted successfully');
          location.reload()

        } catch (err) {
          console.error(err);
        }
      };

      return (
        <div className="text-center">
          <button
            onClick={onDelete}
            className="button-error "
          >
            Delete
            <Trash size={13} />
          </button>
        </div>
      );
    },
  },


];