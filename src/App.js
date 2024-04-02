import { useState } from "react";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "focaccia.jpg",
    soldOut: false,
    stock: 2,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "margherita.jpg",
    soldOut: false,
    stock: 2,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "spinaci.jpg",
    soldOut: false,
    stock: 1,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "funghi.jpg",
    soldOut: false,
    stock: 10,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "salamino.jpg",
    soldOut: true,
    stock: 0,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "prosciutto.jpg",
    soldOut: false,
    stock: 20,
  },
];

function App() {
  const [isloading, SetIsLoading] = useState(false);
  const [menu, SetMenu] = useState(false);
  function handleLoading() {
    SetIsLoading(true);
    setTimeout(() => {
      SetIsLoading(false);
      SetMenu(true);
    }, 2000);
  }
  function sortPizza() {
    return pizzaData.slice().sort((a, b) => b.stock - a.stock);
  }
  return (
    <div className="container">
      <Header />
      <Menu
        isloading={isloading}
        menu={menu}
        SetIsLoading={SetIsLoading}
        SetMenu={SetMenu}
        handleLoading={handleLoading}
        sortPizza={sortPizza}
      />
      <Footer menu={menu} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast Pizza</h1>
    </header>
  );
}

function MenuItems({ isloading, menu, handleLoading, sortPizza }) {
  return (
    <>
      {!menu && (
        <button className="btn" onClick={handleLoading}>
          Show menu
        </button>
      )}
      {isloading && <div className="loader"></div>}

      {menu && (
        <ul className="pizzas">
          {sortPizza().map((pizza) => (
            <Pizza pizzaobj={pizza} key={pizza.name} />
          ))}
        </ul>
      )}
    </>
  );
}

function Menu({ isloading, menu, handleLoading, sortPizza }) {
  const pizzas = pizzaData;
  const pizzaCount = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaCount > 0 ? (
        <MenuItems
          isloading={isloading}
          menu={menu}
          handleLoading={handleLoading}
          sortPizza={sortPizza}
        />
      ) : (
        <p>Still working on menu! Thanks for your patience :)</p>
      )}
    </main>
  );
}

function Opening({ closeTime }) {
  return (
    <div className="order">
      <p>
        We are currently Open! Till {closeTime}:00. Come visit us or order.
        online!
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function IsOpen({ openTime, closeTime }) {
  return (
    <p>
      COME BACK LATER BETWEEN {openTime}:00 - {closeTime}:00 :)
    </p>
  );
}

function Footer({ menu }) {
  const hour = new Date().getHours();
  const openTime = "12";
  const closeTime = "24";
  const isOpen = hour >= openTime && hour <= closeTime;

  return (
    menu && (
      <footer className="footer">
        {isOpen ? (
          <Opening closeTime={closeTime} />
        ) : (
          <IsOpen openTime={openTime} closeTime={closeTime} />
        )}
      </footer>
    )
  );
}

function Pizza({ pizzaobj }) {
  return (
    <li className={`pizza ${pizzaobj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaobj.photoName} rel={pizzaobj.name} />
      <div>
        <h3>{pizzaobj.name}</h3>
        <p>{pizzaobj.ingredients}</p>
        <span>{pizzaobj.price}$</span>
        <span>{pizzaobj.soldOut ? "SOLD OUT" : pizzaobj.soldOut}</span>
        <span>
          Stock:{pizzaobj.stock}
          {pizzaobj.stock === 0
            ? " (Khatam)"
            : pizzaobj.stock < 5
            ? " (Khatam hone laga)"
            : " (Bohat pare hain)"}
        </span>
      </div>
    </li>
  );
}

export default App;
