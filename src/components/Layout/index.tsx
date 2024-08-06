import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../types";

type Props = {
  notes: Note[];
};

const Layout = ({ notes }: Props) => {
  // url'den parametreyi alma
  const { id } = useParams();

  // bütün notların arasında id'si urldeki parametreyle eşleşen note'un verilerini arama
  const found = notes.find((i) => i.id === id);

  // note bulunamazsa anasayfaya yönlendirme
  if (!found) return <Navigate to="/" replace />;

  // alt route'un bileşenini ekrana basma ve bulunan note verilerini gönderme
  return <Outlet context={found} />;
};

export default Layout;