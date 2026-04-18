"use client"
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react';
import { ScenarioData } from '@/app/types';
import { columns } from '@/app/forTable/Column/questions';
import { ScenarioColumns } from '@/app/forTable/Column/scenarios';
import { QuestionData } from '@/app/types';

export default function DetailPage() {

  const [otherUsers, setOtherUsers] = useState<ScenarioData[]>([]);
  const [users, setUsers] = useState<QuestionData[]>([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [Spage, setSPage] = useState(0);
  const [Stotal, setSTotal] = useState(0);
  const pageSize = 10;
  const SpageSize = 10;


  useEffect(() => {

    const details_result = async () => {
      try {
        const userUrl = `/api/admin/getAllQues?limit=${pageSize}&offset=${page * pageSize}`;
        const teamUrl = `/api/admin/getAllScenario?limit=${SpageSize}&offset=${Spage * SpageSize}`;

        // Run both fetches in parallel
        const [userRes, teamRes] = await Promise.all([fetch(userUrl), fetch(teamUrl)]);

        // Parse both JSON responses
        const [userJson, teamJson] = await Promise.all([userRes.json(), teamRes.json()]);

        setUsers(userJson.data);
        setTotal(userJson.total);

        setOtherUsers(teamJson.data);
        setSTotal(teamJson.total);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    details_result()
  }, [page, Spage])


  return (
    <section className='container m-5'>

      <Tabs defaultValue="users" className="w-[1000px]  ">
        <TabsList className="tabsList grid grid-cols-2 w-full rounded-md p-1">
          <TabsTrigger
            value="users"
            className="tab-btn" >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="teamMembers"
            className="tab-btn"
          >
            Scenarios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">

          <div className=" mx-auto px-4 py-6">
            {(users || []).length > 0 && (
              <div className="p-4">
                <DataTable<QuestionData> columns={columns} data={users} />


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

        <TabsContent value="teamMembers">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {(otherUsers || []).length > 0 && (
              <div className="p-4">
                <DataTable<ScenarioData> columns={ScenarioColumns} data={otherUsers} />
                <div className="mt-4 flex items-center justify-between">
                  <button
                    disabled={Spage === 0}
                    onClick={() => setSPage((p) => p - 1)}
                    className="button-primary"
                  >
                    Previous
                  </button>
                  <span>
                    Page {Spage + 1} of {Math.ceil(Stotal / SpageSize)}
                  </span>
                  <button
                    disabled={(Spage + 1) * SpageSize >= Stotal}
                    onClick={() => setSPage((p) => p + 1)}
                    className="button-success"
                  >
                    Next
                  </button>
                </div>

              </div>
            )}
          </div>
        </TabsContent>
      </Tabs >
    </section>
  )
}





