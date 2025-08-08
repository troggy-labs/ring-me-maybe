import type { RingSpecs } from './types'

interface RingConfigurationProps {
  specs: RingSpecs
  onSpecsChange: (specs: RingSpecs) => void
}

function RingConfiguration({ specs, onSpecsChange }: RingConfigurationProps) {
  const updateSpec = (key: keyof RingSpecs, value: string | number) => {
    onSpecsChange({ ...specs, [key]: value })
  }

  return (
    <div className="ring-configuration">
      <div className="config-grid">
        <div className="config-group">
          <label htmlFor="stoneType">Stone Type</label>
          <select 
            id="stoneType"
            value={specs.stoneType} 
            onChange={(e) => updateSpec('stoneType', e.target.value)}
          >
            <option value="diamond">Diamond</option>
            <option value="sapphire">Sapphire</option>
            <option value="ruby">Ruby</option>
            <option value="emerald">Emerald</option>
            <option value="moissanite">Moissanite</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="carat">Carat Weight</label>
          <select 
            id="carat"
            value={specs.carat} 
            onChange={(e) => updateSpec('carat', parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5 ct</option>
            <option value={0.75}>0.75 ct</option>
            <option value={1.0}>1.0 ct</option>
            <option value={1.25}>1.25 ct</option>
            <option value={1.5}>1.5 ct</option>
            <option value={2.0}>2.0 ct</option>
            <option value={2.5}>2.5 ct</option>
            <option value={3.0}>3.0 ct</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="color">Color Grade</label>
          <select 
            id="color"
            value={specs.color} 
            onChange={(e) => updateSpec('color', e.target.value)}
          >
            <option value="D">D (Colorless)</option>
            <option value="E">E (Colorless)</option>
            <option value="F">F (Colorless)</option>
            <option value="G">G (Near Colorless)</option>
            <option value="H">H (Near Colorless)</option>
            <option value="I">I (Near Colorless)</option>
            <option value="J">J (Near Colorless)</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="clarity">Clarity Grade</label>
          <select 
            id="clarity"
            value={specs.clarity} 
            onChange={(e) => updateSpec('clarity', e.target.value)}
          >
            <option value="FL">FL (Flawless)</option>
            <option value="IF">IF (Internally Flawless)</option>
            <option value="VVS1">VVS1 (Very Very Slightly Included)</option>
            <option value="VVS2">VVS2 (Very Very Slightly Included)</option>
            <option value="VS1">VS1 (Very Slightly Included)</option>
            <option value="VS2">VS2 (Very Slightly Included)</option>
            <option value="SI1">SI1 (Slightly Included)</option>
            <option value="SI2">SI2 (Slightly Included)</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="cut">Cut Quality</label>
          <select 
            id="cut"
            value={specs.cut} 
            onChange={(e) => updateSpec('cut', e.target.value)}
          >
            <option value="round">Round Brilliant</option>
            <option value="princess">Princess</option>
            <option value="emerald">Emerald</option>
            <option value="asscher">Asscher</option>
            <option value="oval">Oval</option>
            <option value="radiant">Radiant</option>
            <option value="pear">Pear</option>
            <option value="heart">Heart</option>
            <option value="marquise">Marquise</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="metalType">Metal Type</label>
          <select 
            id="metalType"
            value={specs.metalType} 
            onChange={(e) => updateSpec('metalType', e.target.value)}
          >
            <option value="platinum">Platinum</option>
            <option value="white-gold">White Gold</option>
            <option value="yellow-gold">Yellow Gold</option>
            <option value="rose-gold">Rose Gold</option>
            <option value="palladium">Palladium</option>
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="style">Ring Style</label>
          <select 
            id="style"
            value={specs.style} 
            onChange={(e) => updateSpec('style', e.target.value)}
          >
            <option value="solitaire">Solitaire</option>
            <option value="halo">Halo</option>
            <option value="three-stone">Three Stone</option>
            <option value="vintage">Vintage</option>
            <option value="pave">Pave</option>
            <option value="channel">Channel</option>
            <option value="tension">Tension</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default RingConfiguration