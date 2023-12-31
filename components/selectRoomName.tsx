import { useEffect, useState, useCallback, useRef } from "react";
import { PlayerStatsType } from "../types/model";
import styled from "styled-components";

const RoomNameContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 30px;
`;

const ValidateRoomName = styled.div`
  margin-left: 10px;
  color: white;
`;

const RoomNameInput = styled.input`
  color: white;
  border: 1px solid white;
  border-radius: 12px;
  padding: 10px 8px;
  min-width: 50px;
  min-height: 20px;
`;

type SelectRoomNameProps = {
  validate: (roomName: string) => void
}

const SelectRoomName = ({ validate }: SelectRoomNameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <RoomNameContainer>
      <RoomNameInput ref={inputRef} placeholder="tap room name" />
      <ValidateRoomName
        onClick={() =>
          inputRef && inputRef.current
            ? validate(inputRef.current.value)
            : null
        }
      >
        Go
      </ValidateRoomName>
    </RoomNameContainer>
  );
}

export default SelectRoomName;
