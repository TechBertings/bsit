/* eslint-disable eqeqeq */
import { useState } from "react";

/* ---------- Styles (plain CSS, no Tailwind) ---------- */
const CSS = `
.app{display:flex;min-height:100vh;font-family:system-ui,sans-serif;background:#f8fafc;color:#0f172a}
.side{width:220px;background:#0f172a;color:#e2e8f0;flex-shrink:0}
.side .brand{padding:18px 20px}.side .brand b{display:block;color:#fff;font-size:16px}.side .brand span{font-size:12px;color:#94a3b8}
.nav button{display:block;width:100%;text-align:left;background:none;border:0;color:inherit;padding:10px 20px;font-size:14px;cursor:pointer}
.nav button:hover{background:#1e293b}.nav button.on{background:#0284c7;color:#fff}
.main{flex:1;padding:32px;max-width:900px}
h1{font-size:24px;margin:0 0 16px}h2{font-size:17px;margin:0 0 12px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:16px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.stat b{font-size:28px;display:block}.stat span{font-size:13px;color:#64748b}
.tbl{overflow-x:auto;border:1px solid #e2e8f0;border-radius:8px;background:#fff;margin-bottom:16px}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0}th{background:#f8fafc;color:#475569}
input,select{width:100%;padding:9px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;box-sizing:border-box;margin-bottom:10px;background:#fff}
input:focus,select:focus{outline:2px solid #bae6fd;border-color:#0284c7}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
.btn{background:#0284c7;color:#fff;border:0;border-radius:6px;padding:9px 16px;font-size:14px;cursor:pointer}.btn:hover{background:#0369a1}
.sub{display:flex;gap:4px;border-bottom:1px solid #cbd5e1;margin-bottom:14px;overflow-x:auto}
.sub button{background:none;border:0;border-bottom:2px solid transparent;padding:8px 12px;font-size:14px;cursor:pointer;color:#64748b;white-space:nowrap}
.sub button.on{border-color:#0f766e;color:#0f766e;font-weight:600}
.pg{background:#fff;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:14px}
.pgh{display:flex;justify-content:space-between;background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:6px 14px;font-size:12px;color:#64748b}
.line{display:flex;gap:16px;padding:6px 14px;border-bottom:1px solid #f1f5f9;min-height:20px;font-size:15px;line-height:1.5}
.ln{width:24px;text-align:right;color:#0f766e;font:12px monospace;flex-shrink:0;line-height:1.9}
.code .tx{font:14px monospace;white-space:pre}
.note{background:#f0fdfa;border:1px solid #99f6e4;color:#134e4a;border-radius:6px;padding:10px 14px;font-size:14px}
@media(max-width:700px){.app{flex-direction:column}.side{width:auto}.nav{display:flex;overflow-x:auto}.nav button{width:auto;white-space:nowrap}.grid4{grid-template-columns:1fr 1fr}.main{padding:16px}}
`;

/* ---------- System logic (mirrors the "Source Code" artifact, defects included) ---------- */
const LOAN_DAYS = 7;
const FINE_PER_DAY = 10;
const MAX_BOOKS = 4;

function borrowBook(student, book) {
  if (book.copies < 0) {
    return "Book not available";
  }
  if (student.loans.length > MAX_BOOKS) {
    return "Limit reached";
  }
  const d = new Date();
  d.setDate(d.getDate() + LOAN_DAYS);
  student.loans.push({ bookId: book.id, due: d });
  book.copies = book.copies + 1;
  return "OK";
}

function computeFine(loan, today) {
  const late = (today - loan.due) / 86400000;
  return late * FINE_PER_DAY;
}

function searchBooks(books, q) {
  let result = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books.length; j++) {
      if (i == j && books[i].title.includes(q)) result.push(books[i]);
    }
  }
  return result;
}

const daysAgo = (n) => new Date(Date.now() - n * 86400000);
const START_BOOKS = [
  { id: 1, title: "Noli Me Tangere", author: "Jose Rizal", isbn: "9710800011", copies: 2 },
  { id: 2, title: "El Filibusterismo", author: "Jose Rizal", isbn: "9710800028", copies: 1 },
  { id: 3, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780590353427", copies: 0 },
  { id: 4, title: "Charlotte's Web", author: "E.B. White", isbn: "9780064400558", copies: 3 },
];
const START_STUDENTS = [
  { id: "S-001", name: "Aguenza", section: "6-A", loans: [{ bookId: 2, due: daysAgo(3) }] },
  { id: "S-002", name: "Palomares", section: "5-B", loans: [{ bookId: 1, due: daysAgo(-4) }] },
  { id: "S-003", name: "Perez", section: "6-A", loans: [] },
  { id: "S-004", name: "Pernitez", section: "BT-3102", loans: [] },
  { id: "S-005", name: "Rubia", section: "BT-3102", loans: [] },
  { id: "S-006", name: "Alemania", section: "BT-3102", loans: [] },
  { id: "S-007", name: "Pascual", section: "BT-3102", loans: [] },
  { id: "S-008", name: "Palinsad", section: "BT-3102", loans: [] },
  { id: "S-009", name: "Feliciano", section: "BT-3102", loans: [] },
  { id: "S-010", name: "Diaz", section: "BT-3102", loans: [] },
   { id: "S-011", name: "Boglosa", section: "BT-3102", loans: [] },
      { id: "S-012", name: "Marabe", section: "BT-3102", loans: [] },
       { id: "S-013", name: "Baylon", section: "BT-3102", loans: [] },
           { id: "S-014", name: "Noble", section: "BT-3102", loans: [] },
  
  
];

/* ---------- Inspection artifacts (Documents tab) ---------- */
const ARTIFACTS = {
  brief: {
    tab: "Client Brief", inspect: "Reference only (use it to check the other artifacts)",
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
    tab: "Requirements", inspect: "Requirements Inspection",
    title: "Software Requirements Specification (SRS) v1.0",
    lines: [
      "FR1. The librarian shall add a book with title, author, ISBN, and number of copies.",
      "FR2. The system shall allow a student to borrow up to 3 books at a time.",
      "FR3. Each loan shall be due 7 days after the borrow date.",
      "FR4. The fine for an overdue book shall be ₱5 per day.",
      "FR5. The system shall search books by title or author.",
      "FR6. The system shall send an SMS reminder to the student 1 day before the due date.",
      'FR7. The system shall display "Book not available" when a book has no copies left.',
      "NFR1. The system shall be fast and user-friendly.",
      "NFR2. The system shall run on Windows 10.",
    ],
  },
  design: {
    tab: "Design", inspect: "Design Inspection",
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
    tab: "Source Code", inspect: "Code Inspection", title: "borrowing.js (JavaScript)", code: true,
    lines: [
      "const LOAN_DAYS = 7;", "const FINE_PER_DAY = 10;", "const MAX_BOOKS = 4;", "",
      "function borrowBook(student, book) {", "  if (book.copies < 0) {", '    return "Book not available";', "  }",
      "  if (student.loans.length > MAX_BOOKS) {", '    return "Limit reached";', "  }",
      "  const d = new Date();", "  d.setDate(d.getDate() + LOAN_DAYS);",
      "  student.loans.push({ bookId: book.id, due: d });", "  book.copies = book.copies + 1;", '  return "OK";', "}", "",
      "function computeFine(loan, today) {", "  const late = (today - loan.due) / 86400000;", "  return late * FINE_PER_DAY;", "}", "",
      "function searchBooks(books, q) {", "  let result = [];", "  for (let i = 0; i < books.length; i++) {",
      "    for (let j = 0; j < books.length; j++) {",
      "      if (i == j && books[i].title.includes(q)) result.push(books[i]);", "    }", "  }", "  return result;", "}",
    ],
  },
  test: {
    tab: "Test Plan", inspect: "Test Plan Inspection", title: "Test Plan v1.0",
    lines: [
      'TC1. Borrow a book that has 2 copies. Expected: "OK" and copies becomes 1.',
      'TC2. A student with 4 loans borrows another book. Expected: "Limit reached".',
      "TC3. A book is returned 2 days late. Expected fine: ₱20.",
      'TC4. Search for "Potter". Expected: the matching book is displayed.',
      "TC5. Check that the system responds quickly. Expected: the system is fast.",
      "TC6. The due date is tomorrow. Expected: an SMS reminder is sent.",
    ],
  },
};
const PER_PAGE = 12;

function Documents() {
  const [key, setKey] = useState("brief");
  const a = ARTIFACTS[key];
  const pages = [];
  for (let i = 0; i < a.lines.length; i += PER_PAGE) pages.push(a.lines.slice(i, i + PER_PAGE));
  return (
    <div>
      <h1>Documents</h1>
      <div className="sub">
        {Object.entries(ARTIFACTS).map(([k, v]) => (
          <button key={k} className={key === k ? "on" : ""} onClick={() => setKey(k)}>{v.tab}</button>
        ))}
      </div>
      <h2>{a.title}</h2>
      <p style={{ fontSize: 14, color: "#475569", marginTop: -6 }}>Inspection type for your log: {a.inspect}</p>
      {pages.map((p, pi) => (
        <div className={"pg" + (a.code ? " code" : "")} key={pi}>
          <div className="pgh"><span>Page {pi + 1}</span><span>Use these line numbers in your Defects Log</span></div>
          {p.map((t, i) => (
            <div className="line" key={i}><span className="ln">{pi * PER_PAGE + i + 1}</span><span className="tx">{t}</span></div>
          ))}
        </div>
      ))}
      <div className="note">Defect types: Missing, Wrong, Extra, Usability, Performance, Style, Clarity, Question. Severity: Major or Minor.</div>
    </div>
  );
}

/* ---------- App ---------- */
const NAV = ["Dashboard", "Books", "Borrow", "Fines", "Documents"];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [books, setBooks] = useState(START_BOOKS);
  const [students, setStudents] = useState(START_STUDENTS);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ title: "", author: "", isbn: "", copies: "" });
  const [sel, setSel] = useState({ student: "S-001", book: 1 });
  const [msg, setMsg] = useState("");

  const now = new Date();
  const allLoans = students.flatMap((s) => s.loans.map((l) => ({ ...l, student: s })));
  const bookName = (id) => (books.find((b) => b.id === id) || {}).title;

  const addBook = () => {
    setBooks([...books, { id: books.length + 1, ...form, copies: Number(form.copies) }]);
    setForm({ title: "", author: "", isbn: "", copies: "" });
  };

  const submitBorrow = () => {
    const s = students.find((x) => x.id === sel.student);
    const b = books.find((x) => x.id === Number(sel.book));
    const s2 = { ...s, loans: [...s.loans] };
    const b2 = { ...b };
    setMsg(borrowBook(s2, b2));
    setStudents(students.map((x) => (x.id === s.id ? s2 : x)));
    setBooks(books.map((x) => (x.id === b.id ? b2 : x)));
  };

  return (
    <div className="app">
      <style>{CSS}</style>
      <aside className="side">
        <div className="brand"><b>St. Molina Library</b><span>Borrowing System v1.0</span></div>
        <nav className="nav">
          {NAV.map((n) => (
            <button key={n} className={page === n ? "on" : ""} onClick={() => setPage(n)}>{n}</button>
          ))}
        </nav>
      </aside>

      <main className="main">
        {page === "Dashboard" && (
          <>
            <h1>Dashboard</h1>
            <div className="grid4">
              <div className="card stat"><b>{books.length}</b><span>Book titles</span></div>
              <div className="card stat"><b>{books.reduce((n, b) => n + b.copies, 0)}</b><span>Copies on shelf</span></div>
              <div className="card stat"><b>{allLoans.length}</b><span>Active loans</span></div>
              <div className="card stat"><b>{allLoans.filter((l) => l.due < now).length}</b><span>Overdue</span></div>
            </div>
          </>
        )}

        {page === "Books" && (
          <>
            <h1>Books</h1>
            <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="tbl">
              <table>
                <thead><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Copies</th></tr></thead>
                <tbody>
                  {searchBooks(books, q).map((b) => (
                    <tr key={b.id}><td><b>{b.title}</b></td><td>{b.author}</td><td>{b.isbn}</td><td>{b.copies}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <h2>Add a book</h2>
              <div className="row2">
                {["title", "author", "isbn", "copies"].map((f) => (
                  <input key={f} placeholder={f} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
                ))}
              </div>
              <button className="btn" onClick={addBook}>OK</button>
            </div>
          </>
        )}

        {page === "Borrow" && (
          <>
            <h1>Borrow a book</h1>
            <div className="card" style={{ maxWidth: 420 }}>
              <select value={sel.student} onChange={(e) => setSel({ ...sel, student: e.target.value })}>
                {students.map((s) => <option key={s.id} value={s.id}>{s.id} {s.name}</option>)}
              </select>
              <select value={sel.book} onChange={(e) => setSel({ ...sel, book: e.target.value })}>
                {books.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
              </select>
              <button className="btn" onClick={submitBorrow}>Submit</button>
              {msg && <p style={{ fontSize: 14 }}>{msg}</p>}
            </div>
          </>
        )}

        {page === "Fines" && (
          <>
            <h1>Penalties</h1>
            <div className="tbl">
              <table>
                <thead><tr><th>Student</th><th>Book</th><th>Due</th><th>Fine</th></tr></thead>
                <tbody>
                  {allLoans.map((l, i) => (
                    <tr key={i}>
                      <td>{l.student.name}</td><td>{bookName(l.bookId)}</td>
                      <td>{l.due.toString().slice(0, 15)}</td><td>₱{computeFine(l, now)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page === "Documents" && <Documents />}
      </main>
    </div>
  );
}