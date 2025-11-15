import { memo } from "react";

interface RandomAmountSettingsProps {
  isRandomEnabled: boolean;
  onRandomToggle: (enabled: boolean) => void;
  minAmount: string;
  maxAmount: string;
  onMinAmountChange: (value: string) => void;
  onMaxAmountChange: (value: string) => void;
  decimalPlaces: number;
  onDecimalPlacesChange: (value: number) => void;
}

const RandomAmountSettings = memo(({
  isRandomEnabled,
  onRandomToggle,
  minAmount,
  maxAmount,
  onMinAmountChange,
  onMaxAmountChange,
  decimalPlaces,
  onDecimalPlacesChange
}: RandomAmountSettingsProps) => {
    return (
    <section>
      <h2>random amounts</h2>
      <div className="setting-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isRandomEnabled}
            onChange={(e) => onRandomToggle(e.target.checked)}
          />
          <span>enable random amounts</span>
        </label>
      </div>
      
      {isRandomEnabled && (
        <>
          <p>set random amount range and decimal places for automatic generation</p>
          <div className="shadow">
            <div className="random-controls">
              <span>min</span>
              <input
                type="number"
                step="0.0000000001"
                min="0"
                value={minAmount}
                onChange={(e) => onMinAmountChange(e.target.value)}
                placeholder="0.1"
              />
              <span>max</span>
              <input
                type="number"
                step="0.0000000001"
                min="0"
                value={maxAmount}
                onChange={(e) => onMaxAmountChange(e.target.value)}
                placeholder="0.3"
              />
              <span>decimals</span>
              <input
                type="number"
                min="0"
                max="18"
                value={decimalPlaces}
                onChange={(e) => onDecimalPlacesChange(parseInt(e.target.value) || 0)}
                style={{ width: '60px' }}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
});

RandomAmountSettings.displayName = "RandomAmountSettings";

export default RandomAmountSettings; 
