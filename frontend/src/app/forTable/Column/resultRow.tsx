"use client"

import { ColumnDef } from '@tanstack/react-table';
import { ChevronRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {ResultRow} from "@/app/forTable/types/resultRow";


export const columns: ColumnDef<ResultRow>[] = [

  {
    accessorKey: "is_correct",
    header: () => <div className="text-center"></div>,
    cell: ({ getValue }) => {
      const value = getValue<boolean>();
      return (
        <div className="text-center">
          {value ? <Check className="text-green-500" size={18} /> : <X className="text-red-500" size={18} />}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<number>()}</div>,
  },
  // {
  //   accessorKey: "correct_option",
  //   header: () => <div className="text-center">Correct Opt</div>,
  //   cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  // },
  // {
  //   accessorKey: "selected_option",
  //   header: () => <div className="text-center">Selected Opt</div>,
  //   cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  // },

  {
    accessorKey: "subject",
    header: () => <div className="text-center">Subject</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "system",
    header: () => <div className="text-center">System</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "time_taken_secs",
    header: () => <div className="text-center">Time</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} secs</div>,
  },
  {
    id: "score", 
    header: () => <div className="text-center">Score</div>,
    cell: ({ row }) => {
      const total = row.original.total;
      const obtain = row.original.obtain;

      return (
        <div className="text-center">
          {obtain} / {total}
        </div>
      );
    },
  }
  ,
  {
    id: "chevron",
    header: () => <div className="text-center" />,
    cell: ({ row }) => {
      const id = row.original.id;
      const ques_id = row.original.question_id;

      return (
        <div className="text-center">
          <Link href={`/dashboard/result/detail?id=${id}&ques_id=${ques_id}`} target='no_blank'>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>
      );
    },
  }

];