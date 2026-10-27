import { useState } from "react";

// Each tab = one inspection artifact. Line numbers are shown so students can write Page/Line No. in their log.
const ARTIFACTS = {
  brief: {
    tab: "Client Brief",
    inspect: "Reference only (use this to check the other artifacts)",
    title: "Client Brief: Library Borrowing System",
    lines: [
      "Client: St. Molina Elementary School Library. Contact: Ms. Reyes, Head Librarian.",
      "Problem: Borrowing records are kept in paper notebooks. Books get lost and fines are not tracked.",
      "Need: The librarian wants to record books, borrowing, returns, and overdue fines in one system.",
      "Rules: A student may borrow up to 3 books for 7 days. The fine is ₱5 per day per overdue book.",
      "Users: Only the librarian uses the system. There are no student accounts.",
      "Budget: Very limited. No SMS or paid third-party services.",
      "Environment: The system runs on the library's single Windows 10 desktop PC.",
    ],
  },
  req: {
    tab: "Requirements",
    inspect: "Requirements Inspection",
    title: "Software Requirements Specification (SRS) v1.0",
    lines: [
      "FR1. The librarian shall add a book with title, author, ISBN, and number of copies.",
      "FR2. The system shall allow a student to borrow up to 3 books at a time.",
      "FR3. Each loan shall be due 7 days after the borrow date.",
      "FR4. The fine for an overdue book shall be ₱5 per day.",
      "FR5. The system shall search books by title or author.",
      "FR6. The system shall send an SMS reminder to the student 1 day before the due date.",
      "FR7. The system shall display \"Book not available\" when a book has no copies left.",
      "NFR1. The system shall be fast and user-friendly.",
      "NFR2. The system shall run on Windows 10.",
    ],
  },
  design: {
    tab: "Design",
    inspect: "Design Inspection",
    title: "Software Design Document (SDD) v1.0",
    lines: [
      "Modules: Book Management, Borrowing, Fines, Search.",
      "Book(id, title, author, isbn, copies)",
      "Student(id, name, section)",
      "Loan(id, bookId, studentId, borrowDate, dueDate, returnDate)",
      "Loan period: the due date is 5 days after the borrow date.",
      "Borrow flow: (1) Librarian enters student ID. (2) Librarian selects a book.",
      "(3) System checks the number of copies. (4) System checks the student's loan count.",
      "(5) System creates the loan and reduces the book's copies by one.",
      "Search: the system searches books by title.",
      "Fine: days late × fine rate. The fine is shown to the librarian.",
      "Storage: all data is saved in the local database.",
    ],
  },
  code: {
    tab: "Source Code",
    inspect: "Code Inspection",
    title: "borrowing.js (JavaScript)",
    code: true,
    lines: [
      "const LOAN_DAYS = 7;",
      "const FINE_PER_DAY = 10;",
      "const MAX_BOOKS = 4;",
      "",
      "function borrowBook(student, book) {",
      "  if (book.copies < 0) {",
      "    return \"Book not available\";",
      "  }",
      "  if (student.loans.length > MAX_BOOKS) {",
      "    return \"Limit reached\";",
      "  }",
      "  const d = new Date();",
      "  d.setDate(d.getDate() + LOAN_DAYS);",
      "  student.loans.push({ bookId: book.id, due: d });",
      "  book.copies = book.copies + 1;",
      "  return \"OK\";",
      "}",
      "",
      "function computeFine(loan, today) {",
      "  const late = (today - loan.due) / 86400000;",
      "  return late * FINE_PER_DAY;",
      "}",
      "",
      "function searchBooks(books, q) {",
      "  let result = [];",
      "  for (let i = 0; i < books.length; i++) {",
      "    for (let j = 0; j < books.length; j++) {",
      "      if (i == j && books[i].title.includes(q)) result.push(books[i]);",
      "    }",
      "  }",
      "  return result;",
      "}",
    ],
  },
  test: {
    tab: "Test Plan",
    inspect: "Test Plan Inspection",
    title: "Test Plan v1.0",
    lines: [
      "TC1. Borrow a book that has 2 copies. Expected: \"OK\" and copies becomes 1.",
      "TC2. A student with 4 loans borrows another book. Expected: \"Limit reached\".",
      "TC3. A book is returned 2 days late. Expected fine: ₱20.",
      "TC4. Search for \"Potter\". Expected: the matching book is displayed.",
      "TC5. Check that the system responds quickly. Expected: the system is fast.",
      "TC6. The due date is tomorrow. Expected: an SMS reminder is sent.",
    ],
  },
};

const LINES_PER_PAGE = 12;

function Page({ lines, code, offset, pageNo }) {
  return (
    <div className="rounded-md border border-slate-300 bg-white">
      <div className="flex justify-between border-b border-slate-200 bg-slate-50 px-4 py-1.5 text-xs text-slate-500">
        <span>Page {pageNo}</span>
        <span>Line numbers are for your Defects Log</span>
      </div>
      <ol className="divide-y divide-slate-100">
        {lines.map((text, i) => (
          <li key={i} className="flex min-h-[2rem] items-start gap-4 px-4 py-1.5">
            <span className="w-6 shrink-0 select-none text-right font-mono text-xs leading-6 text-teal-700">
              {offset + i + 1}
            </span>
            <span
              className={
                code
                  ? "whitespace-pre font-mono text-sm leading-6 text-slate-800"
                  : "text-[15px] leading-6 text-slate-800"
              }
            >
              {text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function App() {
  const [key, setKey] = useState("brief");
  const a = ARTIFACTS[key];
  const pages = [];
  for (let i = 0; i < a.lines.length; i += LINES_PER_PAGE) {
    pages.push(a.lines.slice(i, i + LINES_PER_PAGE));
  }

  return (
    <div className="bg-slate-100 text-slate-900" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      <header className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5">
          <h1 className="text-2xl font-semibold">Library Borrowing System: Inspection Package</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Inspect each artifact against the Client Brief. Record every defect you find on your Inspection Defects Log
            using the page and line number shown on the left of each line.
          </p>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4" aria-label="Artifacts">
          {Object.entries(ARTIFACTS).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setKey(k)}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                key === k ? "border-teal-700 text-teal-800" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {v.tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl space-y-4 px-4 py-6">
        <div>
          <h2 className="text-lg font-semibold">{a.title}</h2>
          <p className="text-sm text-slate-600">Inspection type for your log: {a.inspect}</p>
        </div>
        {pages.map((p, i) => (
          <Page key={i} lines={p} code={a.code} offset={i * LINES_PER_PAGE} pageNo={i + 1} />
        ))}
        <p className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Defect types: Missing, Wrong, Extra, Usability, Performance, Style, Clarity, Question. Severity: Major or Minor.
        </p>
      </main>
    </div>
  );
}