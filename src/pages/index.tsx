import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useUserContext } from "~/context/UserContext";

export default function Home() {
  // Auth data from Clerk
  const { user, isSignedIn: clerkSignedIn } = useUser();
  // Auth data from the url of the app (/?signedIn=true)
  const appSignedIn = useRouter().query.signedIn;
  // Mutation to create a user in the database
  const { mutate: createUser, isError: failedCreatingUser } =
    api.user.create.useMutation();

  const { currentUser } = useUserContext();

  // Create a user in the database when the user is signed in
  useEffect(() => {
    if (clerkSignedIn && appSignedIn && user && !currentUser) {
      createUser({
        first_name: user.firstName,
        last_name: user.lastName,
        profile_picture_url: user.imageUrl,
      });
    } else {
      return;
    }
  }, [createUser, appSignedIn, clerkSignedIn, user, currentUser]);

  useEffect(() => {
    if (failedCreatingUser) {
      console.error(failedCreatingUser);
    }
  }, [failedCreatingUser]);

  return <></>;
}
