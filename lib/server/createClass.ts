import { randomInt } from "crypto";
import type { Firestore } from "firebase-admin/firestore";
import { CLASS_CODE_ALPHABET, CLASS_CODE_LENGTH } from "@/lib/classes";

// Writes classes/{code} with a fresh code. Shared by the teacher's
// /api/classes POST and the admin's "mark ready" on a course request.

export interface NewClassFields {
  name: string;
  examId: string;
  state: string | null;
  teacherUid: string;
  teacherEmail: string | null;
  teacherName: string;
  school: string;
  /** The course request a class was made for, when John made it. */
  courseRequestId?: string;
}

function newCode(): string {
  let code = "";
  for (let i = 0; i < CLASS_CODE_LENGTH; i++) code += CLASS_CODE_ALPHABET[randomInt(CLASS_CODE_ALPHABET.length)];
  return code;
}

/** The new class's code, or null when five codes in a row were taken. */
export async function createClassDoc(db: Firestore, fields: NewClassFields): Promise<string | null> {
  // A code is 31^5 (28M) wide; retry the rare collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode();
    try {
      await db.collection("classes").doc(code).create({
        code,
        ...fields,
        createdAt: new Date().toISOString(),
        memberCount: 0,
      });
      return code;
    } catch (error: unknown) {
      if ((error as { code?: number }).code !== 6) throw error; // 6 = ALREADY_EXISTS
    }
  }
  return null;
}
