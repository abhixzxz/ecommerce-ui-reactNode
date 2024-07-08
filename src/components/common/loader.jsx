import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader">Loading...</div>
      <style jsx>{`
        .loader,
        .loader:before,
        .loader:after {
          border-radius: 50%;
        }
        .loader {
          color: #facc15; /* Tailwind's yellow-400 color */
          font-size: 11px;
          text-indent: -9999em;
          margin: 55px auto;
          position: relative;
          width: 10em;
          height: 10em;
          box-shadow: inset 0 0 0 1em;
          transform: translateZ(0);
          animation: load4 1.3s infinite linear;
        }
        @keyframes load4 {
          0%,
          100% {
            box-shadow: inset 0 0 0 1em;
          }
          50% {
            box-shadow: inset 0 0 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
