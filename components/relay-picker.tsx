"use client";

import { useState } from "react";
import { MapPin, Search, Clock, Check, Loader2, X } from "lucide-react";
import { useCartStore, type SelectedRelay } from "@/store/cart-store";

interface RelayPoint {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  distance: string;
  openingHours: string[];
}

export function RelayPicker() {
  const { selectedRelay, setRelay } = useCartStore();
  const [zipCode, setZipCode] = useState("");
  const [relays, setRelays] = useState<RelayPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function handleSearch() {
    const cp = zipCode.trim();
    if (!/^\d{5}$/.test(cp)) {
      setError("Entrez un code postal valide (5 chiffres)");
      return;
    }
    setError("");
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/dpd/relais?cp=${cp}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        setRelays([]);
      } else {
        setRelays(data.relays ?? []);
        if ((data.relays ?? []).length === 0) {
          setError("Aucun relais trouve pour ce code postal");
        }
      }
    } catch {
      setError("Erreur de connexion");
      setRelays([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(relay: RelayPoint) {
    const selected: SelectedRelay = {
      id: relay.id,
      name: relay.name,
      address: relay.address,
      zipCode: relay.zipCode,
      city: relay.city,
    };
    setRelay(selected);
  }

  // Already selected — show compact view
  if (selectedRelay) {
    return (
      <div className="rounded-[10px] border border-violet-200 bg-violet-50 px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
            <div>
              <p className="text-sm font-semibold text-violet-900">Point relais DPD Pickup</p>
              <p className="mt-1 text-sm font-medium text-[#0F0F10]">{selectedRelay.name}</p>
              <p className="text-sm text-[#6B7280]">{selectedRelay.address}</p>
              <p className="text-sm text-[#6B7280]">{selectedRelay.zipCode} {selectedRelay.city}</p>
            </div>
          </div>
          <button
            onClick={() => setRelay(null)}
            className="rounded-lg border border-violet-200 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
          >
            Changer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-violet-200 bg-violet-50/50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-5 w-5 text-violet-600" />
        <h3 className="text-sm font-semibold text-violet-900">Choisir un point relais DPD</h3>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Code postal (ex: 75001)"
          className="flex-1 h-10 rounded-lg border border-[#DBDBDB] bg-white px-3 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="h-10 px-4 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Rechercher
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-3">{error}</p>
      )}

      {/* Results */}
      {relays.length > 0 && (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {relays.map((relay) => (
            <div
              key={relay.id}
              className="rounded-lg border border-[#DBDBDB] bg-white p-3 hover:border-violet-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F0F10] truncate">{relay.name}</p>
                  <p className="text-xs text-[#6B7280]">{relay.address}</p>
                  <p className="text-xs text-[#6B7280]">{relay.zipCode} {relay.city}</p>
                  <p className="text-xs text-violet-600 font-medium mt-1">{relay.distance}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => handleSelect(relay)}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    Choisir
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === relay.id ? null : relay.id)}
                    className="text-xs text-[#6B7280] hover:text-violet-600 flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {expandedId === relay.id ? "Masquer" : "Horaires"}
                  </button>
                </div>
              </div>

              {/* Opening hours */}
              {expandedId === relay.id && relay.openingHours.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {relay.openingHours.map((h, i) => (
                      <p key={i} className="text-xs text-[#6B7280]">{h}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {searched && !loading && relays.length === 0 && !error && (
        <p className="text-sm text-[#6B7280] text-center py-4">Aucun relais trouve</p>
      )}
    </div>
  );
}
