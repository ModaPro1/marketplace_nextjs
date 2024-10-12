import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function useDeleteModal<T extends any[]>(deleteFunction: (...args: T) => Promise<void>) {
  const router = useRouter();

  const confirmDelete = async (...args: T) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
          await deleteFunction(...args);
        },
      });

      if (result.isConfirmed) {
        router.refresh();
        Swal.fire({
          title: "Deleted",
          text: "Your item has been deleted.",
          icon: "success",
          confirmButtonColor: "#009688",
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return { confirmDelete };
}

// First, we are defining a generic type called T, which should be an array of any element type (or more specifically, it represents a tuple if the number and types of arguments are fixed).
// whenever having a rest parameter (`...args` similar to spread operator syntax but for collecting arguments) TS will infer the types of the passed arguments and treat them as an array (or more precisely, a tuple if the number and types of arguments are fixed).
// for example: if passing string, number TS will infer them like this [string, number]
// when passing a function to `useDeleteModal` that for example accepts two arguments (string, number), these types are infered to `T` as a tuple like this: [string, array]
// in `confirmDelete` we are accepting arguments to be passed to it with the type `T` so in our case the (string, number) tuple and pass these arguments to the `deleteFunction`
// now the function passed to the `useDeleteModal` will be called by `confirmDelete after confirming the modal and will get the arguments it needs
