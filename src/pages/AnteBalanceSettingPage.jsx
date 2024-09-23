import { useState } from "react";

function AnteBalanceSettingPage({ doneCallback }) {
  const [ante, setAnte] = useState(0);
  const [playersBalance, setPlayersBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const validateNumber = (number) => {
    if (number <= 0 || number % 5 != 0) {
      return false;
    }

    return true;
  };

  const validateBalanceMoreThanAnte = () => {
    if (ante >= playersBalance) {
      return false;
    }

    return true;
  };

  const setAnteFromForm = (value) => {
    const intValue = parseInt(value);

    if (validateNumber(intValue)) {
      setAnte(intValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Ante must be a positive multiple of 5!");
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();

    if (errorMessage) {
      return;
    }

    if (
      validateBalanceMoreThanAnte() &&
      validateNumber(playersBalance) &&
      validateNumber(ante)
    ) {
      doneCallback(ante, playersBalance);
    } else {
      setErrorMessage(
        "You really think you can try to play chpoker with ante greater than your balance? You silly sassy baka! =<"
      );
    }
  };

  const setPlayerBalanceFromForm = (value) => {
    const intValue = parseInt(value);

    if (validateNumber(intValue)) {
      setPlayersBalance(intValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Balance must be a positive multiple of 5!");
    }
  };

  return (
    <div className="flex flex-col content-center justify-center w-1/2 m-auto h-screen">
      <form onSubmit={(e) => validateAndSubmit(e)}>
        <div className="flex flex-col content-center justify-center">
          <label
            htmlFor="first_name"
            className="text-white block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
          >
            Ante
          </label>
          <input
            type="number"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$100 Gazzillion"
            required
            onChange={(e) => setAnteFromForm(e.target.value)}
          />
        </div>
        <div className="flex flex-col content-center justify-center mt-4">
          <label
            htmlFor="first_name"
            className="text-white block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
          >
            Players balance
          </label>
          <input
            type="number"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$100 000 000 Ebillion"
            required
            onChange={(e) => setPlayerBalanceFromForm(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="my-4 text-red-400 text-center">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AnteBalanceSettingPage;
