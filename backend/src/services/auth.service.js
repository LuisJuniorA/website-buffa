import bcrypt from "bcryptjs";
import { supabase } from "../database.js";

const SALT_ROUNDS = 10;

/**
 * Insérer un joueur dans la table `players` avec mot de passe hashé.
 */
export async function registerPlayer(login, password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const { data, error } = await supabase
        .from("players")
        .insert([{ login, password: hashedPassword }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Vérifier les identifiants : cherche le login, compare le hash.
 */
export async function loginPlayer(login, password) {
    const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("login", login)
        .single();

    if (error || !data) return null;

    const match = await bcrypt.compare(password, data.password);
    if (!match) return null;

    // Retourne tout sauf le hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...safeData } = data;
    return safeData;
}
