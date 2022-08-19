import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AppUserType, IdProps } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";

const DeleteAccountButton = ({ id }: IdProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const deleteAccount = async () => {
        return await customAxios.delete<AppUserType>("/user/deleteaccount", {
            data: { id }
        });
    };

    const deleteMutation = useMutation(deleteAccount, {
        onError: () => {
            toast.error("Error deleting account");
        },
        onSuccess: () => {
            router.push("/signup");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["user"]);
        }
    });

    return (
        <section>
            <label
                id="deleteAccountButton"
                htmlFor="confirm-delete-account"
                className="btn btn-outline btn-error">
                Delete Account
            </label>

            <input
                type="checkbox"
                id="confirm-delete-account"
                className="modal-toggle"
            />
            <div
                id="deleteModal"
                className="modal modal-bottom sm:modal-middle">
                <div className="p-10 modal-box">
                    <h3 className="text-lg font-bold text-center text-red-500">
                        Are you sure you want to delete your account?
                    </h3>
                    <div className="flex items-stretch justify-around">
                        <div className="modal-action">
                            <label
                                id="cancelDeleteAccountButton"
                                htmlFor="confirm-delete-account"
                                className="btn btn-outline btn-error">
                                Cancel
                            </label>
                        </div>
                        <div className="modal-action">
                            <label
                                id="confirmDeleteAccountButton"
                                onClick={() => deleteMutation.mutate()}
                                htmlFor="confirm-delete-account"
                                className="btn btn-outline btn-success">
                                Confirm
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeleteAccountButton;
