import { useState } from "react";

const PageContainer = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-4">
      {children}
    </div>
  </div>
);

const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-green-600 text-white py-2 rounded-xl mt-3"
  >
    {children}
  </button>
);

// 🔥 AGENDA PROFISSIONAL
export const Agenda = () => {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const horarios = [
    "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00"
  ];

  const reservasMock = {
    "09:00": { cliente: "João", status: "confirmada" },
    "14:00": { cliente: "Carlos", status: "pendente" },
    "18:00": { cliente: "Lucas", status: "confirmada" }
  };

  const formatarData = (data) => {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    });
  };

  const mudarDia = (offset) => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + offset);
    setDataSelecionada(novaData);
  };

  return (
    <PageContainer>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button onClick={() => mudarDia(-1)}>◀</button>
        <h2 className="text-sm font-semibold capitalize">
          {formatarData(dataSelecionada)}
        </h2>
        <button onClick={() => mudarDia(1)}>▶</button>
      </div>

      {/* LISTA DE HORÁRIOS */}
      <div className="mt-4 space-y-2">
        {horarios.map((hora) => {
          const reserva = reservasMock[hora];

          return (
            <div
              key={hora}
              className={`p-3 rounded-xl border flex justify-between items-center ${
                reserva
                  ? reserva.status === "confirmada"
                    ? "bg-green-50 border-green-300"
                    : "bg-yellow-50 border-yellow-300"
                  : "bg-gray-50"
              }`}
            >
              <div>
                <p className="font-semibold">{hora}</p>
                {reserva ? (
                  <p className="text-sm text-gray-600">
                    {reserva.cliente}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">Disponível</p>
                )}
              </div>

              {reserva ? (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    reserva.status === "confirmada"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {reserva.status}
                </span>
              ) : (
                <button className="text-green-600 text-sm font-semibold">
                  Reservar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* AÇÃO */}
      <Button>Nova reserva</Button>
    </PageContainer>
  );
};

export default Agenda;
