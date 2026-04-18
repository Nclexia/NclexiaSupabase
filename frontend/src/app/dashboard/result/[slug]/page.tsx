"use client"
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/app/context/AuthContext';
import React from 'react';
import Dough from './Dough';
import { ProgressBars } from './ProgressBar';
import { columns } from '@/app/forTable/Column/resultRow';
import {ResultRow} from "@/app/forTable/types/resultRow";



interface User {
  id: string;

}


interface Practice_session {
  score: string;
  total_questions: number;
  correct_answers: number;

}

export default function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);


  const [result, setResult] = useState<ResultRow[]>([]);
  const [detailFromPractice, setDetailFromPractice] = useState<Practice_session | null>(null);


  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const { user } = useAuth() as { user: User };

  useEffect(() => {
    let domain = (process.env.NEXT_PUBLIC_Phase == 'development') ? process.env.NEXT_PUBLIC_Backend_Domain : ''

    let details_result = async () => {

      const res = await fetch(`/api/test/detail_results?user_id=${user.id}&practice_session_id=${slug}&limit=${pageSize}&offset=${page * pageSize}`
      );
      const json = await res.json();
      setResult(json.data);
      setTotal(json.total);
    }
    let practice_session = async () => {

      const res = await fetch(`/api/test/practice_session_by_id?user_id=${user.id}&practice_session_id=${slug}`
      );
      const json = await res.json();
      setDetailFromPractice(json.data);
    }
    details_result()
    practice_session()
  }, [])


  return (
    <section className='container m-5'>

      <Tabs defaultValue="result" className="w-[600px]  ">
        <TabsList className="tabsList grid grid-cols-2 w-full rounded-md p-1">
          <TabsTrigger
            value="result"
            className="tab-btn" >
            Test Result
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="tab-btn"
          >
            Test Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="result">
          <div >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Left: Doughnut Chart */}
                <div className="w-40 h-40 flex-shrink-0">
                  {detailFromPractice?.score && !isNaN(parseFloat(detailFromPractice.score)) ? (
                    <Dough score={parseFloat(detailFromPractice.score)} />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>

                {/* Right: Stats */}
                <div className="text-sm space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Total Questions</span>
                    <span>{detailFromPractice?.total_questions}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t pt-2">
                    <span className="font-medium">Correct Answers</span>
                    <span>{detailFromPractice?.correct_answers}</span>
                  </div>
                </div>
              </div>
            </div>
            {(result || []).length > 0 && (
              <div className="p-4">
                <h1 className="text-xl font-bold mb-4">User Result Data</h1>
                {/* <DataTable columns={columns} data={result} /> */}
                <DataTable<ResultRow> columns={columns} data={result} />


                {/* Pagination UI */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                    className="button-primary"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page + 1} of {Math.ceil(total / pageSize)}
                  </span>
                  <button
                    disabled={(page + 1) * pageSize >= total}
                    onClick={() => setPage((p) => p + 1)}
                    className="button-success"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="max-w-3xl mx-auto px-4 py-6">

            <div style={{ padding: '2rem' }}>
              <h2>Subject</h2>
              <ProgressBars data={result} type='subject' />

            </div>
            <div style={{ padding: '2rem' }}>
              <h2>System</h2>
              <ProgressBars data={result} type='system' />
            </div>
          </div>
        </TabsContent>


      </Tabs >
    </section>
  )
}