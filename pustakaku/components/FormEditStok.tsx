"use client";

import { useActionState } from "react";
import { updateStokBuku, type FormBukuState } from "@/app/actions";

const awal: FormBukuState = { sukses: false, pesan: "" };

export default function FormEditStok({
  bukuId,
  stokTersedia,
  stokTotal,
}: {
  bukuId: number;
  stokTersedia: number;
  stokTotal: number;
}) {
  const [state, formAction, pending] = useActionState(updateStokBuku, awal);

  return (
    <form action={formAction} className="mt-5 border-t pt-4">
      <input type="hidden" name="id" value={bukuId} />
      <p className="text-sm font-medium text-gray-800">Ubah Stok Buku</p>

      <div className="mt-3 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="editStokTersedia" className="block text-xs text-gray-600">
            Stok saat ini
          </label>
          <input
            id="editStokTersedia"
            name="stokTersedia"
            type="number"
            min={0}
            defaultValue={stokTersedia}
            className="mt-1 w-28 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>

        <div>
          <label htmlFor="editStokTotal" className="block text-xs text-gray-600">
            Stok total
          </label>
          <input
            id="editStokTotal"
            name="stokTotal"
            type="number"
            min={0}
            defaultValue={stokTotal}
            className="mt-1 w-28 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan Stok"}
        </button>
      </div>

      {state.galat?.stokTersedia && (
        <p className="mt-2 text-xs text-red-600">{state.galat.stokTersedia}</p>
      )}
      {state.galat?.stokTotal && (
        <p className="mt-2 text-xs text-red-600">{state.galat.stokTotal}</p>
      )}
      {state.pesan && (
        <p className={`mt-2 text-xs ${state.sukses ? "text-green-700" : "text-red-600"}`}>
          {state.pesan}
        </p>
      )}
    </form>
  );
}