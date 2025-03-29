import { useState } from "react";
import { FaCalculator } from 'react-icons/fa';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FaUserGraduate, FaHeartbeat, FaSearch, FaShieldAlt, FaExclamationCircle } from "react-icons/fa"; // Iconos

const indicadores = {
  Caracterización: {
    lista: [
      { nombre: "Población estudiada", definicion: "Descripción de la población que fue estudiada." },
      { nombre: "Datos sociodemográficos", definicion: "Información sobre las características sociales y demográficas de la población." },
      { nombre: "Perfil educativo", definicion: "Descripción de las características educativas de los participantes." }
    ]
  },
  Atención: {
    lista: [
      { nombre: "Número de consultas", definicion: "Cantidad de consultas realizadas durante un periodo." },
      { nombre: "Tiempo de respuesta", definicion: "Tiempo promedio entre la solicitud y la respuesta del servicio." },
      { nombre: "Satisfacción del usuario", definicion: "Evaluación de la satisfacción general de los usuarios con el servicio recibido." }
    ]
  },
  Detección: {
    lista: [
      { nombre: "Casos identificados", definicion: "Número de casos identificados durante un periodo de tiempo." },
      { nombre: "Tasa de detección", definicion: "Porcentaje de casos identificados en relación con los casos esperados." },
      { nombre: "Seguimiento", definicion: "Proceso de seguimiento de los casos detectados para asegurar su resolución." }
    ]
  },
  Prevención: {
    lista: [
      { nombre: "Campañas realizadas", definicion: "Número de campañas de prevención realizadas." },
      { nombre: "Impacto en la población", definicion: "Efecto de las campañas en la conciencia y comportamiento de la población." },
      { nombre: "Reducción de riesgos", definicion: "Medición de la disminución de riesgos debido a las intervenciones preventivas." }
    ]
  },
  Discriminación: {
    lista: [
      { nombre: "Casos reportados", definicion: "Número de casos de discriminación reportados." },
      { nombre: "Medidas correctivas", definicion: "Acciones tomadas para corregir la discriminación detectada." },
      { nombre: "Percepción social", definicion: "Cómo percibe la sociedad la discriminación y las medidas adoptadas." }
    ]
  }
};

export default function IndicadorCalculadora() {
  const [numerador, setNumerador] = useState("");
  const [denominador, setDenominador] = useState("");
  const [resultado, setResultado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Caracterización");
  const [indicadorSeleccionado, setIndicadorSeleccionado] = useState("");

  const calcular = () => {
    if (denominador === "0" || denominador === "") {
      alert("El denominador no puede ser 0 o estar vacío");
      return;
    }
    setResultado((parseFloat(numerador) / parseFloat(denominador)).toFixed(2));
  };

  const handleIndicadorChange = (e) => {
    const seleccionado = e.target.value;
    setIndicadorSeleccionado(seleccionado);
  };

  const obtenerIconoCategoria = (categoria) => {
    switch (categoria) {
      case "Caracterización":
        return <FaUserGraduate className="mr-2" />;
      case "Atención":
        return <FaHeartbeat className="mr-2" />;
      case "Detección":
        return <FaSearch className="mr-2" />;
      case "Prevención":
        return <FaShieldAlt className="mr-2" />;
      case "Discriminación":
        return <FaExclamationCircle className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex space-x-4">
        {Object.keys(indicadores).map((categoria) => (
          <Button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            className={`text-lg px-6 py-2 rounded-xl transition-colors duration-200 ${categoriaSeleccionada === categoria ? "bg-gradient-to-r from-pink-400 to-purple-600 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
          >
            {obtenerIconoCategoria(categoria)}{categoria}
          </Button>
        ))}
      </div>

      <Card className="w-full max-w-xl p-6 bg-white shadow-lg rounded-xl">
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Seleccione el indicador</label>
              <select
                onChange={handleIndicadorChange}
                value={indicadorSeleccionado}
                className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar</option>
                {indicadores[categoriaSeleccionada]?.lista.map((item, index) => (
                  <option key={index} value={item.nombre}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>

            {indicadorSeleccionado && (
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700">Definición</label>
                <textarea
                  value={indicadores[categoriaSeleccionada]?.lista.find(item => item.nombre === indicadorSeleccionado)?.definicion || ""}
                  readOnly
                  rows={4}
                  className="p-3 rounded-xl border bg-gray-100 text-gray-700 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>

          {/* Numerador */}
          <h2 className="text-lg font-semibold text-center text-gray-800">Calculadora</h2>
          <div className="flex flex-col space-y-4">
            <label className="font-medium text-gray-700">Numerador</label>
            <Input
              type="number"
              value={numerador}
              onChange={(e) => setNumerador(e.target.value)}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium text-gray-700">Denominador</label>
            <Input
              type="number"
              value={denominador}
              onChange={(e) => setDenominador(e.target.value)}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <Button onClick={calcular} className="bg-gradient-to-r from-pink-400 to-purple-600 text-white w-full py-3 rounded-xl hover:from-purple-500 hover:to-purple-700 transition-colors duration-300">
            <FaCalculator className="mr-2" /> Calcular
          </Button>

          {resultado !== null && (
            <div className="text-lg font-bold text-center text-gray-800 mt-4">
              Resultado: {resultado}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
