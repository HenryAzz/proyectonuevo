import { auth } from "../../firebase/firebase";
const [user, setUser] = useState<FirebaseUser | null>(null);
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
const { data } = useGetUserByEmailQuery(user?.email || "", { refetchOnMountOrArgChange: true });
{user ? (
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{ border: "1px solid black" }}
          >
{data && (