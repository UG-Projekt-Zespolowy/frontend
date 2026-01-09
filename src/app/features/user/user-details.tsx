"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { LoadingState, UserEditModal } from "@/app/core/components";
import { useUserByEmail, useUpdateUser } from "@/app/core/hooks";

export function UserDetails() {
    const { data: session, status } = useSession();
    const email = session?.user?.email || "";
    const { data: userFromApi, loading: loadingUser } = useUserByEmail(email);
    const { mutate: updateUser, isPending: isUpdating, error: updateError } = useUpdateUser();
    const [showEditModal, setShowEditModal] = useState(false);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        if (userFromApi?.id) {
            setUserId(userFromApi.id);
        }
    }, [userFromApi]);

    if (status === "loading") {
        return <LoadingState />;
    }

    if (!session?.user) {
        return null;
    }

    const displayName = userFromApi?.name || session.user.name || "";
    const displayEmail = userFromApi?.email || session.user.email || "";

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleEditConfirm = (name: string, email: string) => {
        if (!userId) {
            return;
        }
        
        updateUser(
            {
                userId,
                name,
                email: email || undefined,
            },
            {
                onSuccess: () => {
                    setShowEditModal(false);
                    window.location.reload();
                },
            }
        );
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <>
            <div className="space-y-3">
                <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300">
                    <h3 className="font-semibold text-gray-800 mb-1">Name</h3>
                    {displayName && <p className="text-sm text-gray-600">{displayName}</p>}
                </div>
                <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300">
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    {displayEmail && <p className="text-sm text-gray-600">{displayEmail}</p>}
                </div>
                <button
                    type="button"
                    onClick={handleEditClick}
                    disabled={loadingUser}
                    className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loadingUser ? "Loading..." : "Edit Profile"}
                </button>
            </div>

            {showEditModal && (
                <UserEditModal
                    name={displayName}
                    email={displayEmail}
                    isOpen={showEditModal}
                    onClose={handleCloseModal}
                    onConfirm={handleEditConfirm}
                    isUpdating={isUpdating}
                    error={updateError}
                />
            )}
        </>
    );
}