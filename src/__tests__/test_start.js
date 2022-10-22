import { fireEvent, screen } from "@testing-library/react";
import App from "../App";
import { pressKey, renderWithProviders } from "../utils/testUtils";

describe("Start", () => {
  describe("Before game start", () => {
    beforeEach(() => renderWithProviders(<App />));
    it('"given" is enabled', () => {
      const givenButton = screen.getByLabelText("Given");
      expect(givenButton).not.toBeDisabled();
    });
  });

  describe("After game start", () => {
    const setSomeGivens = () => {
      fireEvent.click(screen.getByTestId("cell-0-0"));
      pressKey("1");
      let cellWithGiven = screen.getByTestId("cell-0-0");
      expect(cellWithGiven).toHaveTextContent("1");
      expect(cellWithGiven.dataset.isGiven).toEqual("true");
    };
    beforeEach(() => {
      renderWithProviders(<App />);
      setSomeGivens();
      fireEvent.click(screen.getByText("Start"));
    });

    it('Start button says "Started" and is disabled', () => {
      expect(screen.getByText("Started")).toBeDisabled();
    });

    it('"given" mode is disabled', () => {
      const givenButton = screen.getByLabelText("Given");
      expect(givenButton).toBeDisabled();
    });

    it('the selected mode by default is "Solution"', () => {
      const solutionButton = screen.getByLabelText("Solution");
      expect(solutionButton).toBeChecked();
    });

    it('on cycling forwards, "given" is skipped', () => {
      pressKey("Control");
      pressKey("Control");
      pressKey("Control");
      const givenButton = screen.getByLabelText("Given");
      expect(givenButton).not.toBeChecked();
      const solutionButton = screen.getByLabelText("Solution");
      expect(solutionButton).toBeChecked();
    });

    it('on cycling backwards, "given" is skipped', () => {
      pressKey("Shift");
      const givenButton = screen.getByLabelText("Given");
      expect(givenButton).not.toBeChecked();
      const solutionButton = screen.getByLabelText("Center Pencil Mark");
      expect(solutionButton).toBeChecked();
    });

    it("should not be able to erase givens after start", () => {
      let cellWithGiven = screen.getByTestId("cell-0-0");
      fireEvent.click(cellWithGiven);
      pressKey("Backspace");

      cellWithGiven = screen.getByTestId("cell-0-0");
      expect(cellWithGiven);
      expect(cellWithGiven).toHaveTextContent("1");
      expect(cellWithGiven.dataset.isGiven).toEqual("true");
    });
  });
});
