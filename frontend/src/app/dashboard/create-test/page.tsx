'use client'
import { useState } from 'react';
import subjectToSystems from './subjectToSystems.json';
import Divider from '../../../components/gui/Divider'
import useTestStore from '@/store/testScore';
import { useRouter } from 'next/navigation';

const allSubjects = Object.keys(subjectToSystems);
const allSystems = Array.from(new Set(Object.values(subjectToSystems).flat()));

const CheckboxWithMasterSubject = () => {
  // const [selectedSubjects, setSelectedSubjects] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, boolean>>({});
  const [selectedSystems, setSelectedSystems] = useState<Record<string, boolean>>({});

  // const [selectedSystems, setSelectedSystems] = useState({});
  const [mode, setMode] = useState('Tradition');
  const [testMode, setTestMode] = useState('Practice');

  const [numQuestions, setNumQuestions] = useState('');
  const [catNumQuestions, setCATNumQuestions] = useState('');

  const { setTestData } = useTestStore();
  const router = useRouter();

  const isAllSubjectsChecked = allSubjects.every((subj) => selectedSubjects[subj]);

  const isAnySubjectSelected = Object.values(selectedSubjects).some(Boolean);
  const isAnySystemSelected = Object.values(selectedSystems).some(Boolean);
  const isNumQuestionsValid = numQuestions && parseInt(numQuestions) > 0;

  // Enables button only when all 3 conditions are met
  const isGenerateEnabled = (isAnySubjectSelected || isAnySystemSelected) && isNumQuestionsValid;
  //  Subject toggle
  const handleSubjectChange = (subject: string) => {
    const isChecked = !selectedSubjects[subject];
    setSelectedSubjects((prev) => ({
      ...prev,
      [subject]: isChecked,
    }));
  };

  //  "All Subjects" toggle
  const handleAllSubjectsChange = () => {
    const isChecked = !isAllSubjectsChecked;
    const newSubjects: Record<string, boolean> = {};
    allSubjects.forEach((subject) => {
      newSubjects[subject] = isChecked;
    });
    setSelectedSubjects(newSubjects);
  };

  //  System toggle
  const handleSystemChange = (system: string) => {
    const isChecked = !selectedSystems[system];
    setSelectedSystems((prev) => ({
      ...prev,
      [system]: isChecked,
    }));
  };

  const handleShowSelected = () => {
    const checkedSubjects = Object.entries(selectedSubjects)
      .filter(([_, isChecked]) => isChecked)
      .map(([subject]) => subject);

    const checkedSystems = Object.entries(selectedSystems)
      .filter(([_, isChecked]) => isChecked)
      .map(([system]) => system);


    setTestData({
      subjects: checkedSubjects,
      systems: checkedSystems,
      numQuestions: parseInt(numQuestions),
      type:mode
    });

    console.log("Set test data:", { checkedSubjects, checkedSystems, numQuestions ,mode});

    setTimeout(() => { router.push('/dashboard/test') }, 50);

  };

  const handleCATButton = () => {

  }

  return (
    <>

      <div className='container m-5'>

        <div style={{ marginBottom: '16px' }}>
          <h3>Test Mode</h3>
          <label style={{ marginRight: '12px' }}>
            <input
              type="radio"
              name="testMode"
              value="Practice"
              checked={testMode === 'Practice'}
              onChange={(e) => setTestMode(e.target.value)}
            />
            Practice
          </label>
          <label style={{ marginRight: '12px' }}>
            <input
              type="radio"
              name="testMode"
              value="Adaptive"
              checked={testMode === 'Adaptive'}
              onChange={(e) => setTestMode(e.target.value)}
            />
            Adaptive(CAT)
          </label>

        </div>
        {
          (testMode == "Practice") &&
          <>
            <div style={{ marginBottom: '16px' }}>
              <h3>Test Type</h3>
              <label style={{ marginRight: '12px' }}>
                <input
                  type="radio"
                  name="mode"
                  value="Tradition"
                  checked={mode === 'Tradition'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Tradition
              </label>
              <label style={{ marginRight: '12px' }}>
                <input
                  type="radio"
                  name="mode"
                  value="NGN"
                  checked={mode === 'NGN'}
                  onChange={(e) => setMode(e.target.value)}
                />
                NGN
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="Mixed"
                  checked={mode === 'Mixed'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Mixed
              </label>
            </div>


            <div className='container my-5'>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>
                <input
                  type="checkbox"
                  checked={isAllSubjectsChecked}
                  onChange={handleAllSubjectsChange}
                />
                Subjects
              </label>

              <div className='subjectSystemColumn'>
                {allSubjects.map((subject) => (
                  <label key={subject}>
                    <input
                      type="checkbox"
                      checked={!!selectedSubjects[subject]}
                      onChange={() => handleSubjectChange(subject)}
                    />
                    {subject}  {mode === 'NGN' ? (
                      <span style={{ color: 'green' }}>(NGN)</span>
                    ) : mode === 'Tradition' ? (
                      <span style={{ color: 'blue' }}>(Tradition)</span>
                    ) : (
                      <span style={{ color: 'purple' }}>(Mixed)</span>
                    )}

                  </label>

                ))}
              </div>
            </div>
            <Divider />
            <div className='container my-5'>
              <h3>Systems</h3>
              {/* <button onClick={handleSelectAllSystems} style={{ marginBottom: '10px' }}>
         Select All Systems
      </button> */}
              <div className='subjectSystemColumn'>
                {allSystems.map((system) => (
                  <label key={system} style={{ display: 'block', marginBottom: '6px' }}>
                    <input
                      type="checkbox"
                      checked={!!selectedSystems[system]}
                      onChange={() => handleSystemChange(system)}
                    />
                    {system}    {mode === 'NGN' ? (
                      <span style={{ color: 'green' }}>(NGN)</span>
                    ) : mode === 'Tradition' ? (
                      <span style={{ color: 'blue' }}>(Tradition)</span>
                    ) : (
                      <span style={{ color: 'purple' }}>(Mixed)</span>
                    )}

                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                min={1}
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                disabled={!isAnySubjectSelected && !isAnySystemSelected}
                style={{ width: '120px' }}
                className='text-field'
              />
              <label>
                No. of Questions

              </label>
              <br />
              <button
                onClick={handleShowSelected}
                className="button-success"
                style={{ marginTop: '10px' }}
                disabled={!isGenerateEnabled}
              >
                Generate Test
              </button>
            </div>
          </>
        }

        {
          (testMode == 'Adaptive') &&
          <div className='container m-5'>
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                min={1}
                value={catNumQuestions}
                onChange={(e) => setCATNumQuestions(e.target.value)}
                style={{ width: '120px' }}
                className='text-field'
              />
              <label>
                No. of Questions

              </label>
              <br />
              <button
                onClick={handleCATButton}
                className="button-success"
                style={{ marginTop: '10px' }}
                disabled={!catNumQuestions}
              >
                Generate Test
              </button>
            </div>

          </div>
        }
      </div>


    </>
  );
};

export default CheckboxWithMasterSubject;
