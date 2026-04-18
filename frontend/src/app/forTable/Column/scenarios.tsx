"use client"

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { ScenarioData } from '@/app/types';


export const ScenarioColumns: ColumnDef<ScenarioData>[] = [

    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} </div>,
    },

    {
        accessorKey: "scenario",
        header: () => <div className="text-center">Scenario </div>,
        cell: ({ getValue }) => <div className="text-center"> {getValue<string>()} </div>,
    },

    {
        accessorKey: "subject",
        header: () => <div className="text-center">Subject </div>,
        cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
    },
    {
        accessorKey: "system",
        header: () => <div className="text-center">System</div>,
        cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
    },
    {
        accessorKey: "type",
        header: () => <div className="text-center">Type</div>,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue<string>() || "Null"}</div>
        ),

    },
    {
        accessorKey: "score",
        header: () => <div className="text-center">Score</div>,
        cell: ({ getValue }) => <div className="text-center"> {getValue<string>()}</div>,
    },



];