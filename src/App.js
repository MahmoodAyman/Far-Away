import { useState } from "react";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const Swal = withReactContent(Swal);

// const messages = [
//   "Learn React ⚛️",
//   "Apply for jobs 💼",
//   "Invest your new income 🤑",
// ];

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

// -------------------First App form

// export default function App() {
//   const style = { backgroundColor: "#7950f2", color: "#fff" };

//   const [step, setStep] = useState(1);
//   const [isOpen, setIsOpen] = useState(true);
//   function handlePrevious() {
//     if (step > 1) setStep((curStep) => curStep - 1);
//   }
//   function handleNext() {
//     if (step < messages.length) {
//       setStep((curStep) => curStep + 1);
//     }
//   }
//   return (
//     <>
//       <button calseName="close" onClick={() => setIsOpen((is) => !is)}>
//         &times;
//       </button>
//       {isOpen && (
//         <div className="steps">
//           <div className="numbers">
//             <div className={`${step >= 1 ? "active" : ""}`}>1</div>
//             <div className={`${step >= 2 ? "active" : ""}`}>2</div>
//             <div className={`${step >= 3 ? "active" : ""}`}>3</div>
//           </div>
//           <p className="message">
//             Step {step} : {messages[step - 1]}
//           </p>
//           <div className="buttons">
//             <button style={style} onClick={handlePrevious}>
//               Previous
//             </button>
//             <button style={style} onClick={handleNext}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// ------------------------secon App Far Away
export default function App() {
  const [items, setItmes] = useState([]);
  function handleAddItems(item) {
    setItmes((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItmes((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItmes((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setItmes([]);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  return (
    <div class="app">
      <Logo />
      <Form onAddItmes={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}
function Form({ onAddItmes }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItmes(newItem);
    setDescription("");
    setQuantity(1);
  }
  function addNeeds() {}
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, idx) => idx + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClikc={addNeeds}>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul className="">
        {sortedItems.map((item) => (
          <Item
            Item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
function Item({ Item, onDeleteItem, onToggleItems }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        value={Item.packed}
        onChange={() => onToggleItems(Item.id)}
      />
      <span style={Item.packed ? { textDecoration: "line-through" } : {}}>
        {Item.description} {Item.quantity}
      </span>
      <button onClick={() => onDeleteItem(Item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const packeItems = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  console.log(packeItems);
  return (
    <footer className="stats">
      <em>
        {numItems === packeItems
          ? "You got everything! Ready to go 🚗"
          : `You have ${numItems} items on your list, and you alreday packed
      ${packeItems} (${Math.round((packeItems / numItems) * 100)}%).`}
      </em>
    </footer>
  );
}
