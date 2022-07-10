import React, { FC } from 'react';
import StyledTile, { StyledTileProps } from './StyledTile';
import StyledTileValue from './StyledTileValue';
import {TILE_MAPPING} from '../../utils/constants'

export interface TileProps extends StyledTileProps {
  isNew?: boolean;
  isMerging?: boolean;
}

const Tile: FC<TileProps> = ({
  value,
  x,
  y,
  width,
  height,
  isNew = false,
  isMerging = false,
}) => {
  const display = TILE_MAPPING.get(value) || value;
  return <StyledTile value={value} x={x} y={y} width={width} height={height}>
    <StyledTileValue value={value} isNew={isNew} isMerging={isMerging}>
      {display}
    </StyledTileValue>
  </StyledTile>;
};

export default Tile;
