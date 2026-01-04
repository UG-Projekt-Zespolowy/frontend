import { useSession } from "next-auth/react";


export function UserDetails() {

    const { data: session } = useSession();

    if (!session?.user) {
        return null;
    }
    const user = session.user;

    return (
        <div className="space-y-3">
            <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300">
                <h3 className="font-semibold text-gray-800 mb-1">Name</h3>
                {user.name && (
                    <p className="text-sm text-gray-600">{user.name}</p>
                )}
            </div>
            <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300">
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                {user.email && (
                    <p className="text-sm text-gray-600">{user.email}</p>
                )}
            </div>
        </div>
    );
}