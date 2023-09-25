import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  const { access_token } = await getUserAccount(session!.user!.id);

  const res = await fetch("http://localhost:3000/todos", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();

  return data;
});
