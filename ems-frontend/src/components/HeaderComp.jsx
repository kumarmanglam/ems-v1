import React from "react";

function HeaderComp() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark p">
          <a href="/employees" className="navbar-brand px-5">
            Employee Management System
          </a>
        </nav>
      </header>
    </div>
  );
}

export default HeaderComp;
