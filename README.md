# 🔄 Sorting Algorithms Performance Analyzer

An interactive web application built with Next.js for comparing and visualizing the performance of various sorting algorithms across different input sizes. This project provides empirical analysis of time complexity through real-time experiments and dynamic visualizations.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Recharts](https://img.shields.io/badge/Recharts-3.5.1-8884d8?style=for-the-badge)](https://recharts.org/)

![Sorting Algorithms Demo](performance_graph_sorting_algos.png)

## 🎯 Features

- **8 Sorting Algorithms Implemented**
  - **Quadratic Complexity:** Selection Sort, Bubble Sort, Insertion Sort
  - **Sub-Quadratic:** Shell Sort
  - **Linearithmic:** Merge Sort, Quick Sort, Heap Sort
  - **Linear:** Counting Sort

- **Interactive Performance Testing**
  - Select specific algorithms to compare
  - Run experiments across 19 different array sizes (10 to 100,000 elements)
  - 5 trials per size for statistical accuracy
  - Real-time progress tracking with pause/resume functionality

- **Dynamic Visualizations**
  - Interactive line charts using Recharts
  - Color-coded algorithm curves
  - Detailed tooltips showing exact timings

- **Comprehensive Analytics**
  - Performance summary tables
  - Algorithm complexity information
  - Statistical analysis (min/max times)
  - CSV data export for further analysis

- **Modern UI/UX**
  - Beautiful gradient backgrounds
  - Smooth animations and transitions
  - Intuitive controls and feedback

## 🚀 Live Demo

**[View Live Demo](https://sorting-algos-project.vercel.app/)**

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Algorithms Implemented](#algorithms-implemented)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Performance Results](#performance-results)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 💻 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/yasdev08/sorting-algos.git
cd sorting-algos
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🎮 Usage

### Running Experiments

1. **Select Algorithms**: Click on the algorithm cards to select which sorting algorithms you want to test
2. **Start Experiment**: Click the "Start Experiments" button
3. **Monitor Progress**: Watch the real-time progress bar and current test information
4. **View Results**: Analyze the performance graph and statistics table
5. **Export Data**: Download results as CSV for further analysis

### Controls

- **Start Experiments**: Begin performance testing
- **Pause/Resume**: Temporarily halt experiments
- **Stop**: Cancel the current experiment
- **Reset**: Clear all results and start fresh
- **Export CSV**: Download performance data
- **Select All/Deselect All**: Quickly toggle all algorithms

### Interpreting Results

- **Red/Orange/Yellow Lines**: O(n²) quadratic algorithms - steep curves indicate poor scaling
- **Green/Blue/Purple Lines**: O(n log n) linearithmic algorithms - gentle curves show excellent scaling
- **Pink Line**: O(n+k) linear algorithm - flattest curve for suitable inputs
- **Crossover Points**: Where algorithm performance advantages shift based on input size

## 🔬 Algorithms Implemented

### Selection Sort
**Time Complexity:** O(n²) | **Space:** O(1)

Repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
```

### Bubble Sort
**Time Complexity:** O(n²) | **Space:** O(1)

Repeatedly swaps adjacent elements if they're in wrong order.

### Insertion Sort
**Time Complexity:** O(n²) | **Space:** O(1)

Builds the sorted array one element at a time by inserting elements into their correct position.

### Shell Sort
**Time Complexity:** O(n log² n) | **Space:** O(1)

Improves insertion sort by comparing elements separated by a gap that shrinks over iterations.

### Merge Sort
**Time Complexity:** O(n log n) | **Space:** O(n)

Divide-and-conquer algorithm that recursively divides, sorts, and merges subarrays.

### Quick Sort
**Time Complexity:** O(n log n) avg | **Space:** O(log n)

Partition-based algorithm that selects a pivot and recursively sorts partitions.

### Heap Sort
**Time Complexity:** O(n log n) | **Space:** O(1)

Uses a binary heap data structure to repeatedly extract maximum elements.

### Counting Sort
**Time Complexity:** O(n + k) | **Space:** O(k)

Non-comparison based algorithm that counts occurrences of each value.


## 🛠️ Technologies Used

### Core Framework
- **[Next.js](https://nextjs.org/)** - React framework with server-side rendering
- **[React](https://reactjs.org/)** - UI library for building interactive interfaces

### Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library for React
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- Custom gradient backgrounds and animations

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Git](https://git-scm.com/)** - Version control

### Deployment
- **[Vercel](https://vercel.com/)** - Optimal platform for Next.js deployment

## ⚙️ How It Works

### Performance Measurement

The application measures sorting algorithm performance using the high-resolution `performance.now()` API:

```javascript
const measureTime = (sortFn, arr) => {
  const copy = [...arr];
  const start = performance.now();
  sortFn(copy);
  const end = performance.now();
  return end - start; // Returns time in milliseconds
};
```

### Test Methodology

1. **Array Generation**: Random integer arrays (0-9,999) for consistent comparison
2. **Multiple Trials**: 5 trials per size to reduce variance
3. **Progressive Sizing**: 19 test sizes from 10 to 100,000 elements
4. **Controlled Environment**: Browser-based timing with minimal background interference

### Data Collection

Results are stored in state and include:
- Array size (n)
- Average execution time per algorithm (milliseconds)
- Null values for sizes exceeding algorithm limits

### Visualization

- **Linear Scale**: Optional for detailed comparison of similar algorithms
- **Color Coding**: Consistent colors for algorithm identification
- **Interactive Tooltips**: Hover for exact timing values

## 📊 Performance Results

### Key Findings

| Algorithm | Best For | Avoid When | Complexity |
|-----------|----------|------------|------------|
| **Insertion Sort** | n < 50, nearly sorted data | n > 1,000 | O(n²) |
| **Selection Sort** | Minimal swaps needed | Any production use | O(n²) |
| **Bubble Sort** | Educational purposes only | Any practical use | O(n²) |
| **Shell Sort** | Medium-sized arrays | Consistency required | O(n log² n) |
| **Merge Sort** | Stability required, large data | Memory constrained | O(n log n) |
| **Quick Sort** | General purpose, large data | Worst-case guarantees | O(n log n) avg |
| **Heap Sort** | In-place with guarantees | Best average performance | O(n log n) |
| **Counting Sort** | Integer sorting, limited range | Large range, non-integers | O(n + k) |

### Performance Crossover Points

- **n < 100**: All algorithms perform similarly (< 1ms)
- **n ≈ 500**: O(n log n) algorithms begin dominating
- **n = 5,000**: Quadratic algorithms become impractical (> 100ms)
- **n > 10,000**: Only linearithmic algorithms remain viable

### Benchmarks

*Sample results on modern hardware (your mileage may vary):*

| Size | Insertion | Merge | Quick | Heap |
|------|-----------|-------|-------|------|
| 1K   | 6.2 ms    | 0.6 ms| 0.4 ms| 0.7 ms|
| 10K  | 615 ms    | 7.8 ms| 4.5 ms| 9.1 ms|
| 100K | -         | 98 ms | 58 ms |112 ms|

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Include detailed description and steps to reproduce
3. Provide browser/environment information

### Suggesting Features

1. Open an issue describing the feature
2. Explain use cases and benefits
3. Discuss implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 🙏 Acknowledgments

### Educational Resources
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/books/introduction-algorithms-third-edition) - Thomas H. Cormen et al.
- [The Art of Computer Programming](https://www-cs-faculty.stanford.edu/~knuth/taocp.html) - Donald E. Knuth
- [Algorithms, 4th Edition](https://algs4.cs.princeton.edu/home/) - Robert Sedgewick & Kevin Wayne

### Libraries & Tools
- [Next.js Team](https://nextjs.org/about) for the amazing framework
- [Recharts Contributors](https://github.com/recharts/recharts) for visualization library
- [Tailwind Labs](https://tailwindcss.com/) for the CSS framework
- [Lucide](https://lucide.dev/) for beautiful icons

### Inspiration
This project was developed as part of a computer science algorithms course to provide hands-on understanding of sorting algorithm performance characteristics and empirical complexity analysis.

## 📧 Contact

**Your Name** - [@yasdev08](https://github.com/yasdev08)

**Project Link**: [https://github.com/yasdev08/sorting-algos](https://github.com/yasdev08/sorting-algos)

---

## 🎓 Academic Use

This project was created for educational purposes to demonstrate:
- Empirical analysis of algorithm complexity
- Performance comparison methodologies
- Data visualization techniques
- Modern web application development

Feel free to use this project for learning, teaching, or as a foundation for your own algorithm analysis tools.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and Next.js

[Report Bug](https://github.com/yasdev08/sorting-algos/issues) · [Request Feature](https://github.com/yasdev08/sorting-algos/issues) · [View Demo](https://sorting-algos-project.vercel.app/)

</div>