"use client"

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { GetUsers } from '@/app/forTable/types/user';



export const columns: ColumnDef<GetUsers>[] = [

  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="text-center">
          <Link href={`/admin/getUserById?id=${id}`} target='no_blank'>
            {id}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },

  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "is_active",
    header: () => <div className="text-center">Is Active</div>,
    cell: ({ getValue }) => {
      const value = getValue<boolean>();
      return <div className="text-center">{value ? "Yes" : "No"}</div>;
    },
  }
  ,
  {
    accessorKey: "provider",
    header: () => <div className="text-center">Provider</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} </div>,
  },
  {
    accessorKey: "last_login",
    header: () => <div className="text-center">Last LogIn</div>,
    cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} </div>,
  },


];