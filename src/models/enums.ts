export enum LandUse {
  RESIDENTIAL = 'RESIDENTIAL',
  MIXED_USE = 'MIXED_USE',
  NON_RESIDENTIAL = 'NON-RESIDENTIAL',
  OTHER = 'NOT_CATEGORISED',
}

export enum ZoneType {
  RESIDENTIAL = 'RESIDENTIAL',
  RESIDENTIAL_LOW = 'RESIDENTIAL_LOW_DENSITY',
  RESIDENTIAL_MID_HIGH = 'RESIDENTIAL_MID_HIGH',
  MIXED_USE = 'MIXED_USE',
  OPEN_SPACE = 'OPEN_SPACE',
  COMMERCIAL = 'COMMERCIAL',
  EMPLOYMENT = 'EMPLOYMENT',
  INSTITUTIONAL = 'INSTITUTIONAL',
  OTHER = 'NOT_CATEGORISED',
}

export enum Colour {
  YELLOW = '#ffff66',
  DARK_YELLOW = '#ffc40c',
  GREEN = '#90ee90',
  DARK_GREEN = '#006400',
  TEAL = '#008080',
  BLUE = '#4169e1',
  BLACK = '#fffff',
}

// TODO: More advanced model would mean more choices.
// Depending on other questions asked this enum might be used as a 
// super set containing all policy answers of this type. 
export enum SubwayPolicyState  {
  NOT_SET, 
  LOW_DENSITY,
  HIGH_DENSITY
}