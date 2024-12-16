import axios from "axios";
import { NoteProps } from "../NoteProps";

const url: string = "http://localhost:5000/notes";

export const getNotes = async ():Promise<NoteProps[]> => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNoteById = async (id: number):Promise<NoteProps> => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveNote = async (id: number, data: NoteProps):Promise<NoteProps> => {
  try {
    const res = await axios.put(`${url}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createNote = async (data: NoteProps):Promise<NoteProps> => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (id: number):Promise<NoteProps> => {
  try {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
