import { useState } from "react";

export default function LoopExamples() {
  const [showLoops, setShowLoops] = useState(false);

  // Sample data for demonstrations
  const numbers = [1, 2, 3, 4, 5];
  const items = [
    { id: 1, name: "JavaScript", category: "language" },
    { id: 2, name: "React", category: "library" },
    { id: 3, name: "Next.js", category: "framework" },
    { id: 4, name: "CSS", category: "language" },
  ];

  // 1. For Loop - Traditional approach
  const forLoopExample = () => {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
      result.push(numbers[i] * 2);
    }
    return result;
  };

  // 2. forEach - Iterate with side effects
  const forEachExample = () => {
    const result = [];
    numbers.forEach((num) => {
      result.push(num * 3);
    });
    return result;
  };

  // 3. map - Transform array
  const mapExample = numbers.map((num) => num * 4);

  // 4. filter - Select specific items
  const filterExample = items.filter((item) => item.category === "language");

  // 5. reduce - Aggregate values
  const reduceExample = numbers.reduce((sum, num) => sum + num, 0);

  // 6. find - Get first matching item
  const findExample = items.find((item) => item.name === "React");

  // 7. some - Check if any item matches
  const someExample = items.some((item) => item.category === "library");

  // 8. every - Check if all items match
  const everyExample = numbers.every((num) => num > 0);

  // 9. While loop
  const whileLoopExample = () => {
    const result = [];
    let i = 0;
    while (i < numbers.length) {
      result.push(numbers[i] * 5);
      i++;
    }
    return result;
  };

  // 10. Do-while loop
  const doWhileLoopExample = () => {
    const result = [];
    let i = 0;
    do {
      result.push(numbers[i] * 6);
      i++;
    } while (i < numbers.length);
    return result;
  };

  // 11. for...of - Iterate over values
  const forOfExample = () => {
    const result = [];
    for (const num of numbers) {
      result.push(num * 7);
    }
    return result;
  };

  // 12. for...in - Iterate over keys (not recommended for arrays)
  const forInExample = () => {
    const result = [];
    const obj = { a: 1, b: 2, c: 3 };
    for (const key in obj) {
      result.push({ key, value: obj[key] });
    }
    return result;
  };

  // 13. flatMap - Map and flatten
  const flatMapExample = numbers.flatMap((num) => [num, num * 2]);

  // 14. reduceRight - Reduce from right to left
  const reduceRightExample = numbers.reduceRight((acc, num) => {
    return acc + num;
  }, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>JavaScript Looping Techniques Demo</h2>
        <button onClick={() => setShowLoops(!showLoops)} style={styles.button}>
          {showLoops ? "Hide Examples" : "Show Examples"}
        </button>
      </div>

      {showLoops && (
        <div style={styles.examples}>
          {/* 1. For Loop */}
          <div style={styles.example}>
            <h3>1. For Loop (Traditional)</h3>
            <code style={styles.code}>
              for (let i = 0; i &lt; numbers.length; i++) {"{...}"}
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(forLoopExample())}
            </p>
            <p style={styles.description}>
              Traditional loop with counter. Useful for complex iterations and when you need index control.
            </p>
          </div>

          {/* 2. forEach */}
          <div style={styles.example}>
            <h3>2. forEach</h3>
            <code style={styles.code}>
              array.forEach((item) =&gt; {"{...}"})
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(forEachExample())}
            </p>
            <p style={styles.description}>
              Executes a function for each array element. Cannot return or break early.
            </p>
          </div>

          {/* 3. map */}
          <div style={styles.example}>
            <h3>3. map</h3>
            <code style={styles.code}>
              array.map((item) =&gt; transformation)
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(mapExample)}
            </p>
            <p style={styles.description}>
              Transforms each element into a new array. Doesn't modify the original array.
            </p>
          </div>

          {/* 4. filter */}
          <div style={styles.example}>
            <h3>4. filter</h3>
            <code style={styles.code}>
              array.filter((item) =&gt; condition)
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(filterExample, null, 2)}
            </p>
            <p style={styles.description}>
              Creates a new array with elements that pass the test condition.
            </p>
          </div>

          {/* 5. reduce */}
          <div style={styles.example}>
            <h3>5. reduce</h3>
            <code style={styles.code}>
              array.reduce((accumulator, item) =&gt; newAccumulator, initialValue)
            </code>
            <p>
              <strong>Result:</strong> {reduceExample}
            </p>
            <p style={styles.description}>
              Reduces array to a single value. Great for summing, grouping, or transforming complex structures.
            </p>
          </div>

          {/* 6. find */}
          <div style={styles.example}>
            <h3>6. find</h3>
            <code style={styles.code}>
              array.find((item) =&gt; condition)
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(findExample, null, 2)}
            </p>
            <p style={styles.description}>
              Returns the first element that matches the condition, or undefined if none.
            </p>
          </div>

          {/* 7. some */}
          <div style={styles.example}>
            <h3>7. some</h3>
            <code style={styles.code}>
              array.some((item) =&gt; condition)
            </code>
            <p>
              <strong>Result:</strong> {someExample ? "true" : "false"}
            </p>
            <p style={styles.description}>
              Returns true if at least one element matches the condition.
            </p>
          </div>

          {/* 8. every */}
          <div style={styles.example}>
            <h3>8. every</h3>
            <code style={styles.code}>
              array.every((item) =&gt; condition)
            </code>
            <p>
              <strong>Result:</strong> {everyExample ? "true" : "false"}
            </p>
            <p style={styles.description}>
              Returns true if all elements match the condition.
            </p>
          </div>

          {/* 9. while Loop */}
          <div style={styles.example}>
            <h3>9. while Loop</h3>
            <code style={styles.code}>
              while (condition) {"{...}"}
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(whileLoopExample())}
            </p>
            <p style={styles.description}>
              Repeats while condition is true. Executes zero or more times.
            </p>
          </div>

          {/* 10. do-while Loop */}
          <div style={styles.example}>
            <h3>10. do-while Loop</h3>
            <code style={styles.code}>
              do {"{...}"} while (condition)
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(doWhileLoopExample())}
            </p>
            <p style={styles.description}>
              Executes at least once, then repeats while condition is true.
            </p>
          </div>

          {/* 11. for...of */}
          <div style={styles.example}>
            <h3>11. for...of</h3>
            <code style={styles.code}>
              for (const item of array) {"{...}"}
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(forOfExample())}
            </p>
            <p style={styles.description}>
              Iterates over iterable values. Modern and clean, supports break/continue.
            </p>
          </div>

          {/* 12. for...in */}
          <div style={styles.example}>
            <h3>12. for...in</h3>
            <code style={styles.code}>
              for (const key in object) {"{...}"}
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(forInExample())}
            </p>
            <p style={styles.description}>
              Iterates over object keys (including inherited). Not recommended for arrays.
            </p>
          </div>

          {/* 13. flatMap */}
          <div style={styles.example}>
            <h3>13. flatMap</h3>
            <code style={styles.code}>
              array.flatMap((item) =&gt; [mapped, values])
            </code>
            <p>
              <strong>Result:</strong> {JSON.stringify(flatMapExample)}
            </p>
            <p style={styles.description}>
              Maps and flattens result by one level. Combines map and flat operations.
            </p>
          </div>

          {/* 14. reduceRight */}
          <div style={styles.example}>
            <h3>14. reduceRight</h3>
            <code style={styles.code}>
              array.reduceRight((accumulator, item) =&gt; newAccumulator, initialValue)
            </code>
            <p>
              <strong>Result:</strong> {reduceRightExample}
            </p>
            <p style={styles.description}>
              Reduces from right to left. Useful for certain algorithms or right-associative operations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    margin: "20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    whiteSpace: "nowrap",
  },
  examples: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  example: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  },
  code: {
    display: "block",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "4px",
    fontFamily: '"Courier New", monospace',
    fontSize: "12px",
    overflow: "auto",
    marginBottom: "10px",
    color: "#d73a49",
  },
  description: {
    fontSize: "13px",
    color: "#666",
    marginTop: "10px",
    lineHeight: "1.5",
  },
};
