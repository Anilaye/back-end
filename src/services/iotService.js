import { supabase } from "../config/supabaseClient.js";
import { logInfo, logError } from "../utils/logger.js";

export function generateSensorReading(point) {
  // fake data
  const volume_l = Math.floor(Math.random() * 20) + 1; // 1..20 L
  const turbidity = Number((Math.random() * 5).toFixed(2)); // NTU
  const battery = Math.floor(Math.random() * 60) + 40; // %
  const filter_health = ["OK", "WARN", "REPLACE"][Math.floor(Math.random() * 3)];
  return {
    point_id: point.id,
    volume_l,
    turbidity,
    battery,
    filter_health,
    created_at: new Date().toISOString(),
  }; 
}

export async function storeReading(reading) {
  const { error } = await supabase.from("iot_readings").insert([reading]);
  if (error) throw error;
  logInfo("Nouvelle lecture stockée", { reading });
}

export async function latestReadings(limit = 20) {
  const { data, error } = await supabase
    .from("iot_readings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  logInfo("Lectures IoT retournées", { count: data.length });
  return data;
}
