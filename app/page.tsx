"use client"
import { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Download, Pause, RefreshCw, Info, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

const SortingComparison = () => {
  const [results, setResults] = useState<Record<string, number>[]>([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');
  const [logScale, setLogScale] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Record<string, boolean>>({});
  const cancelRef = useRef(false);
  const pauseRef = useRef(false);

  // Optimized Sorting Algorithms
  const selectionSort = (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
    }
    return arr;
  };

  const bubbleSort = (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    return arr;
  };

  const insertionSort = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  };

  const mergeSort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
  };

  const merge = (left: number[], right: number[]): number[] => {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const quickSort = (arr: number[], low = 0, high = arr.length - 1): number[] => {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
    return arr;
  };

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  };

  const heapSort = (arr: number[]) => {
    const n = arr.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      heapify(arr, i, 0);
    }
    
    return arr;
  };

  const heapify = (arr: number[], n: number, i: number): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      heapify(arr, n, largest);
    }
  };

  const countingSort = (arr: number[]): number[] => {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }
    
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }
    
    return output;
  };

  const shellSort = (arr: number[]) => {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;
        
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    
    return arr;
  };

  const algorithms = [
    { 
      name: 'Selection Sort', 
      fn: selectionSort, 
      color: '#ef4444', 
      maxSize: 10000,
      complexity: 'O(n²)',
      description: 'Repeatedly finds minimum element',
      category: 'Quadratic'
    },
    { 
      name: 'Bubble Sort', 
      fn: bubbleSort, 
      color: '#f97316', 
      maxSize: 10000,
      complexity: 'O(n²)',
      description: 'Swaps adjacent elements',
      category: 'Quadratic'
    },
    { 
      name: 'Insertion Sort', 
      fn: insertionSort, 
      color: '#f59e0b', 
      maxSize: 10000,
      complexity: 'O(n²)',
      description: 'Builds sorted array incrementally',
      category: 'Quadratic'
    },
    { 
      name: 'Shell Sort', 
      fn: shellSort, 
      color: '#84cc16', 
      maxSize: 100000,
      complexity: 'O(n log² n)',
      description: 'Gap-based insertion sort',
      category: 'Sub-quadratic'
    },
    { 
      name: 'Merge Sort', 
      fn: mergeSort, 
      color: '#10b981', 
      maxSize: 100000,
      complexity: 'O(n log n)',
      description: 'Divide and conquer',
      category: 'Linearithmic'
    },
    { 
      name: 'Quick Sort', 
      fn: quickSort, 
      color: '#3b82f6', 
      maxSize: 100000,
      complexity: 'O(n log n)',
      description: 'Partition-based sorting',
      category: 'Linearithmic'
    },
    { 
      name: 'Heap Sort', 
      fn: heapSort, 
      color: '#8b5cf6', 
      maxSize: 100000,
      complexity: 'O(n log n)',
      description: 'Binary heap structure',
      category: 'Linearithmic'
    },
    { 
      name: 'Counting Sort', 
      fn: countingSort, 
      color: '#ec4899', 
      maxSize: 1000000,
      complexity: 'O(n + k)',
      description: 'Non-comparison based',
      category: 'Linear'
    },
  ];

  const generateRandomArray = (size: number): number[] => {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
      arr[i] = Math.floor(Math.random() * 10000);
    }
    return arr;
  };

  const measureTime = (sortFn: (arr: number[]) => number[], arr: number[]): number => {
    const copy = [...arr];
    const start = performance.now();
    sortFn(copy);
    const end = performance.now();
    return end - start;
  };

  const toggleAlgorithm = (algoName: string) => {
    setSelectedAlgorithms(prev => ({
      ...prev,
      [algoName]: !prev[algoName]
    }));
  };

  const selectAll = () => {
    const allSelected: Record<string, boolean> = {};
    algorithms.forEach(algo => {
      allSelected[algo.name] = true;
    });
    setSelectedAlgorithms(allSelected);
  };

  const deselectAll = () => {
    setSelectedAlgorithms({});
  };

  const runExperiments = async () => {
    const activeAlgos = algorithms.filter(algo => selectedAlgorithms[algo.name]);
    
    if (activeAlgos.length === 0) {
      alert('Please select at least one algorithm to test');
      return;
    }

    setRunning(true);
    setPaused(false);
    setProgress(0);
    cancelRef.current = false;
    pauseRef.current = false;
    
    const experimentResults = [];
    const sizes = [10, 25, 50, 100, 250, 500, 750, 1000, 2000, 3000, 5000, 7500, 10000, 
                   15000, 20000, 30000, 50000, 75000, 100000];
    const trials = 5;
    
    for (let i = 0; i < sizes.length; i++) {
      if (cancelRef.current) break;
      
      while (pauseRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const size = sizes[i];
      const dataPoint: Record<string, number> = { size };
      
      for (const algo of activeAlgos) {
        if (cancelRef.current) break;
        
        if (size <= algo.maxSize) {
          setCurrentTest(`Testing ${algo.name} with n=${size.toLocaleString()}`);
          let totalTime = 0;
          
          for (let trial = 0; trial < trials; trial++) {
            const arr = generateRandomArray(size);
            totalTime += measureTime(algo.fn, arr);
            await new Promise(resolve => setTimeout(resolve, 0));
          }
          
          dataPoint[algo.name] = totalTime / trials;
        }
      }
      
      experimentResults.push(dataPoint);
      setProgress(((i + 1) / sizes.length) * 100);
      setResults([...experimentResults]);
    }
    
    setRunning(false);
    setCurrentTest('Experiments completed!');
  };

  const pauseExperiment = () => {
    pauseRef.current = !pauseRef.current;
    setPaused(!paused);
  };

  const stopExperiment = () => {
    cancelRef.current = true;
    setRunning(false);
    setPaused(false);
    setCurrentTest('Experiments cancelled');
  };

  const resetExperiments = () => {
    setResults([]);
    setProgress(0);
    setCurrentTest('');
  };

  const exportData = () => {
    const activeAlgos = algorithms.filter(algo => selectedAlgorithms[algo.name]);
    const csv = [
      ['Size', ...activeAlgos.map(a => a.name)].join(','),
      ...results.map(r => 
        [r.size, ...activeAlgos.map(a => r[a.name] !== null && r[a.name] !== undefined ? r[a.name].toFixed(4) : '')].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorting_results_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: Array<{ color: string; name: string; value: number }>; label: unknown }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border-2 border-gray-300 rounded-xl shadow-2xl">
          <p className="font-bold text-gray-900 mb-3 text-base border-b pb-2">
            Array Size: {label?.toLocaleString() || 'N/A'}
          </p>
          <div className="space-y-1">
            {payload
              .filter((entry): entry is { color: string; name: string; value: number } => entry.value !== null && entry.value !== undefined)
              .sort((a, b) => a.value - b.value)
              .map((entry, index) => (
                <p key={index} className="text-sm flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="font-semibold">{entry.name}:</span>
                  </span>
                  <span className="font-mono text-gray-700">{entry.value.toFixed(3)} ms</span>
                </p>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const activeAlgorithms = algorithms.filter(algo => selectedAlgorithms[algo.name]);
  const hasResults = results.length > 0;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 border border-indigo-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Sorting Algorithm Performance Analysis
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Compare the empirical performance of {algorithms.length} sorting algorithms across varying input sizes with real-time visualization
              </p>
            </div>
          </div>
          
          {/* Algorithm Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-indigo-600" />
                Select Algorithms
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Deselect All
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {algorithms.map(algo => (
                <button
                  key={algo.name}
                  onClick={() => toggleAlgorithm(algo.name)}
                  disabled={running}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedAlgorithms[algo.name]
                      ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  } ${running ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: algo.color }}
                    ></div>
                    <input
                      type="checkbox"
                      checked={selectedAlgorithms[algo.name] || false}
                      onChange={() => {}}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <h4 className="font-bold text-sm mb-1 text-slate-800">{algo.name}</h4>
                  <p className="text-xs text-slate-600 font-mono">{algo.complexity}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={runExperiments}
              disabled={running}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Play size={20} />
              {running ? 'Running Experiments...' : 'Start Experiments'}
            </button>
            
            {running && (
              <>
                <button
                  onClick={pauseExperiment}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all font-semibold shadow-lg"
                >
                  <Pause size={20} />
                  {paused ? 'Resume' : 'Pause'}
                </button>
                
                <button
                  onClick={stopExperiment}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold shadow-lg"
                >
                  <AlertCircle size={20} />
                  Stop
                </button>
              </>
            )}
            
            {hasResults && !running && (
              <>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <Download size={20} />
                  Export CSV
                </button>
                
                <button
                  onClick={resetExperiments}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all font-semibold shadow-lg"
                >
                  <RefreshCw size={20} />
                  Reset
                </button>
              </>
            )}
          </div>
          
          {/* Progress */}
          {running && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <Clock size={16} className="text-indigo-600" />
                  {currentTest}
                </span>
                <span className="font-bold text-indigo-600 text-lg">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-4 rounded-full transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {paused && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl flex items-center gap-3">
              <Pause size={20} className="text-yellow-700" />
              <span className="text-yellow-800 font-medium">Experiments paused. Click Resume to continue.</span>
            </div>
          )}
        </div>

        {/* Results */}
        {hasResults && activeAlgorithms.length > 0 && (
          <>
            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 border border-indigo-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Performance Comparison</h2>
                {/* <label className="flex items-center gap-3 cursor-pointer bg-indigo-50 px-4 py-2.5 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={logScale}
                    onChange={(e) => setLogScale(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-semibold text-slate-700">Logarithmic Scale</span>
                </label> */}
              </div>
              
              <ResponsiveContainer width="100%" height={550}>
                <LineChart 
                  data={results} 
                  margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" strokeWidth={1} />
                  <XAxis 
                    dataKey="size" 
                    label={{ 
                      value: 'Array Size (n)', 
                      position: 'insideBottom', 
                      offset: -5, 
                      style: { fontWeight: 'bold', fontSize: '14px', fill: '#475569' } 
                    }}
                    scale={logScale ? 'log' : 'auto'}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => value.toLocaleString()}
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Time (milliseconds)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontWeight: 'bold', fontSize: '14px', fill: '#475569' } 
                    }}
                    scale={logScale ? 'log' : 'auto'}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => value >= 1 ? value.toFixed(1) : value.toFixed(3)}
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                    iconSize={20}
                  />
                  {activeAlgorithms.map(algo => (
                    <Line
                      key={algo.name}
                      type="monotone"
                      dataKey={algo.name}
                      stroke={algo.color}
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: algo.color }}
                      activeDot={{ r: 7, strokeWidth: 2 }}
                      connectNulls={true}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics Table */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 border border-indigo-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Performance Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-indigo-200 bg-indigo-50">
                      <th className="text-left p-4 font-bold text-slate-800">Algorithm</th>
                      <th className="text-center p-4 font-bold text-slate-800">Complexity</th>
                      <th className="text-center p-4 font-bold text-slate-800">Category</th>
                      <th className="text-right p-4 font-bold text-slate-800">Min Time</th>
                      <th className="text-right p-4 font-bold text-slate-800">Max Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAlgorithms.map((algo, idx) => {
                      const times = results
                        .map(r => r[algo.name])
                        .filter(t => t !== null && t !== undefined);
                      const minTime = times.length > 0 ? Math.min(...times) : 0;
                      const maxTime = times.length > 0 ? Math.max(...times) : 0;
                      
                      return (
                        <tr 
                          key={algo.name} 
                          className={`border-b border-gray-200 hover:bg-indigo-50 transition-colors ${
                            idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full shadow-md"
                                style={{ backgroundColor: algo.color }}
                              ></div>
                              <span className="font-semibold text-slate-800">{algo.name}</span>
                            </div>
                          </td>
                          <td className="text-center p-4">
                            <span className="font-mono text-xs bg-gray-100 px-3 py-1 rounded-full text-black">
                              {algo.complexity}
                            </span>
                          </td>
                          <td className="text-center p-4">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              algo.category === 'Quadratic' ? 'bg-red-100 text-red-700' :
                              algo.category === 'Linearithmic' ? 'bg-green-100 text-green-700' :
                              algo.category === 'Linear' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {algo.category}
                            </span>
                          </td>
                          <td className="text-right p-4 font-mono text-slate-700">{minTime.toFixed(3)} ms</td>
                          <td className="text-right p-4 font-mono text-slate-700">{maxTime.toFixed(3)} ms</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Algorithm Details */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-indigo-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Algorithm Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeAlgorithms.map(algo => (
                  <div 
                    key={algo.name} 
                    className="border-2 rounded-xl p-5 hover:shadow-xl transition-all transform hover:scale-105"
                    style={{ borderColor: algo.color }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-5 h-5 rounded-full shadow-md"
                        style={{ backgroundColor: algo.color }}
                      ></div>
                      <h3 className="font-bold text-lg text-slate-800">{algo.name}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">{algo.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Complexity:</span>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-black">{algo.complexity}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Category:</span>
                        <span className={`px-2 py-1 rounded font-medium ${
                          algo.category === 'Quadratic' ? 'bg-red-100 text-red-700' :
                          algo.category === 'Linearithmic' ? 'bg-green-100 text-green-700' :
                          algo.category === 'Linear' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {algo.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Max tested:</span>
                        <span className="font-semibold text-slate-700">{algo.maxSize.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Initial State */}
        {!hasResults && !running && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-indigo-100">
            <div className="text-indigo-600 mb-6 flex justify-center">
              <Info size={80} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Ready to Begin</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Select the algorithms you want to compare and click <strong>&quot;Start Experiments&quot;</strong> to begin. 
              The system will test each selected algorithm across multiple array sizes with 5 trials per size for accuracy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="font-bold text-indigo-700 mb-1">19 Test Sizes</div>
                <div className="text-slate-600">From 10 to 100,000 elements</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="font-bold text-purple-700 mb-1">5 Trials Each</div>
                <div className="text-slate-600">Averaged for reliability</div>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                <div className="font-bold text-pink-700 mb-1">~2-3 Minutes</div>
                <div className="text-slate-600">Estimated completion time</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="p-4 bg-pink-50 rounded-xl border border-pink-200 content-center align-middle text-center">
                <div className="text-slate-600 align-middle">Made by <Link href={"https://yasserm.vercel.app"} target='_blank' >Yasser</Link></div>
              
      </footer>
    </div>
    
  );
};

export default SortingComparison;