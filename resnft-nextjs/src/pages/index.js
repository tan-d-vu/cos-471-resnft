import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="h-screen bg-green">
      <div className="float-right px-5 py-5 max-w-15">
        <img src="../Logo.png" alt="logo" id="Landing-logo" />
      </div>

      <div class="flex w-screen justify-center items-center">
        <div className="container m-auto min-w-max">
          <img
            src="../Plate.png"
            className="mx-auto my-4"
            alt="plate"
            id="Landing-plate"
          />

          <div className="text-center">
            <p className="text-3xl text-white">
              Where reservations become collectable
            </p>
            <button className="px-4 py-2 mt-3 text-white rounded-lg bg-slate-700 hover:bg-slate-800">
              <Link href="/login">ENTER</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
