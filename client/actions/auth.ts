"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function getUserSession() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        return null;
    }
    return { status: "success", user: data?.user };
}
export async function signUp(formData: FormData) {
    const supabase = await createClient();

    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        passwordConfirmation: formData.get("password_confirmation") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone_number: formData.get("phone_number") as string,
        gender: formData.get("gender") as string,
        birth_date: formData.get("birth_date") as string,
        nationality_country: formData.get("nationality_country") as string,
        residence_country: formData.get("residence_country") as string,
        residence_city: formData.get("residence_city") as string,
        displacement_status: formData.get("displacement_status") as string,
        education_degree: formData.get("education_degree") as string,
        english_level: formData.get("english_level") as string,
        employment_status: formData.get("employment_status") as string,
    };

    if (credentials.password !== credentials.passwordConfirmation) {
        return {
            status: "Password and Confirm Password do not match.",
            user: null
        };
    }

    const { error, data } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            data: {
                first_name: credentials.first_name,
                last_name: credentials.last_name,
                phone_number: credentials.phone_number,
                gender: credentials.gender,
                birth_date: credentials.birth_date,
                nationality_country: credentials.nationality_country,
                residence_country: credentials.residence_country,
                residence_city: credentials.residence_city,
                displacement_status: credentials.displacement_status,
                education_degree: credentials.education_degree,
                english_level: credentials.english_level,
                employment_status: credentials.employment_status,
            },
        },
    });

    if (error) {
        return {
            status: error?.message,
            user: null
        };
    } else if (data?.user?.identities?.length === 0) {
        return {
            status: "User with this email already exists, please try another email.",
            user: null,
        };
    }

    const { error: insertError } = await supabase.from("user_profiles").insert({
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        phone_number: credentials.phone_number,
        gender: credentials.gender,
        birth_date: credentials.birth_date,
        nationality_country: credentials.nationality_country,
        residence_country: credentials.residence_country,
        residence_city: credentials.residence_city,
        displacement_status: credentials.displacement_status,
        education_degree: credentials.education_degree,
        english_level: credentials.english_level,
        employment_status: credentials.employment_status,
    });
    if (insertError) {
        return {
            status: insertError?.message,
            user: null,
        }
    }

    revalidatePath("/", "layout");
    return { status: "success", user: data.user };
}


export async function signIn(formData: FormData) {
    const supabase = await createClient();
    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };
    const { error, data } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
        return {
            status: error?.message,
            user: null,
        }
    }

    //create a user instance in user_profiles table
    const { data: existingUser } = await supabase.from("user_profiles")
        .select("*")
        .eq("email", credentials?.email)
        .limit(1)
        .single();

    if (!existingUser) {
        const { error: insertError } = await supabase.from("user_profiles").insert({
            email: data?.user.email,
            username: data?.user?.user_metadata?.username,
        });
        if (insertError) {
            return {
                status: insertError?.message,
                user: null,
            }
        }
    }

    revalidatePath("/", "layout");
    return { status: "success", user: data.user };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/login");
}

export async function forgotPassword(formData: FormData) {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(
        formData.get("email") as string,
        {
            redirectTo: `${origin}/reset-password`,
        }
    );

    if (error) {
        return { status: error?.message };
    }

    return { status: "success" };
}

export async function resetPassword(formData: FormData, code: string) {
    const supabase = await createClient();
    const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

    if (CodeError) {
        return { status: CodeError?.message };
    }

    const { error } = await supabase.auth.updateUser({
        password: formData.get("password") as string,
    });
    if (error) {
        return { status: error?.message };
    }
    return { status: "success" };
}