/**
 * TeseoLanding - Landing page corporativa de Teseo Data Lab
 * Presenta servicios de inteligencia de datos y econometría
 */

import { motion } from 'framer-motion'
import {
  Database, TrendingUp, MapPin, BarChart3,
  Building2, Microscope, ArrowRight,
  Users, Trophy, Globe, Zap, LineChart, Target,
  FileText, Boxes, Factory, Home, CheckCircle, Clock,
  Shield, Award, Brain, Star, Quote, ChevronDown,
  Calendar, Calculator, Map
} from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart as RechartsLineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Componente de Red de Nodos para el Hero - Optimizado para móvil
const DataNetworkBackground = () => {
  const [nodes, setNodes] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Generar nodos aleatorios - menos en móvil para mejor performance
    const generateNodes = () => {
      const nodeCount = isMobile ? 25 : 60 // 25 en móvil, 60 en desktop
      const newNodes = []
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Más lento en móvil
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          size: Math.random() * 2 + 1,
          color: ['#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 3)]
        })
      }
      return newNodes
    }

    setNodes(generateNodes())

    // Animar nodos - intervalo más largo en móvil
    const animate = () => {
      setNodes(prevNodes =>
        prevNodes.map(node => {
          let newX = node.x + node.vx
          let newY = node.y + node.vy
          let newVx = node.vx
          let newVy = node.vy

          // Rebotar en los bordes
          if (newX <= 0 || newX >= 100) {
            newVx = -node.vx
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -node.vy
            newY = Math.max(0, Math.min(100, newY))
          }

          return {
            ...node,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          }
        })
      )
    }

    const intervalId = setInterval(animate, isMobile ? 80 : 50) // 80ms en móvil, 50ms en desktop
    return () => clearInterval(intervalId)
  }, [isMobile])

  // Calcular conexiones entre nodos cercanos
  const getConnections = () => {
    const connections = []
    const maxDistance = 12 // Reducido para evitar saturación con más nodos

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            opacity: 1 - (distance / maxDistance)
          })
        }
      }
    }

    return connections
  }

  const connections = getConnections()

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      <svg className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Líneas de conexión */}
        {connections.map((conn, i) => (
          <line
            key={`line-${i}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="#3b82f6"
            strokeWidth="1"
            opacity={conn.opacity * 0.3}
          />
        ))}

        {/* Nodos */}
        {nodes.map(node => (
          <circle
            key={`node-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.color}
            opacity="0.8"
          >
            <animate
              attributeName="r"
              values={`${node.size};${node.size + 1};${node.size}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

// Componente de Mapa de México - SVG Simplificado
const MexicoMap = () => {
  const [hoveredState, setHoveredState] = useState(null)

  // Estados con proyectos y sus colores
  const estadosActivos = {
    'CDMX': { proyectos: 25, color: '#3b82f6' },
    'Querétaro': { proyectos: 18, color: '#10b981' },
    'Hidalgo': { proyectos: 12, color: '#0ea5e9' },
    'Puebla': { proyectos: 10, color: '#f59e0b' },
    'Estado de México': { proyectos: 15, color: '#3b82f6' },
    'Nuevo León': { proyectos: 14, color: '#10b981' },
    'Jalisco': { proyectos: 11, color: '#0ea5e9' },
    'Guanajuato': { proyectos: 9, color: '#f59e0b' },
    'San Luis Potosí': { proyectos: 7, color: '#3b82f6' },
    'Aguascalientes': { proyectos: 6, color: '#10b981' },
    'Veracruz': { proyectos: 5, color: '#0ea5e9' },
    'Michoacán': { proyectos: 4, color: '#f59e0b' }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Imagen SVG de México */}
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        {/* Contorno de México más grande y reconocible */}
        <path
          d="M 80,180 L 120,130 L 180,100 L 260,80 L 340,75 L 420,80 L 500,95 L 570,120 L 620,150 L 660,190 L 690,240 L 710,290 L 720,340 L 710,390 L 680,430 L 640,460 L 580,480 L 510,490 L 450,485 L 390,465 L 330,440 L 270,410 L 220,370 L 180,320 L 150,260 L 100,200 Z M 40,310 L 30,340 L 35,370 L 55,380 L 75,360 L 70,330 Z M 650,440 L 680,470 L 710,500 L 720,530 L 705,550 L 675,545 L 640,520 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Estados destacados como círculos distribuidos */}
        <g>
          {/* CDMX - Centro */}
          <circle
            cx="400" cy="320"
            r={hoveredState === 'CDMX' ? "28" : "24"}
            fill={estadosActivos['CDMX'].color}
            opacity={hoveredState === 'CDMX' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('CDMX')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'CDMX' ? `drop-shadow(0 0 12px ${estadosActivos['CDMX'].color})` : 'none' }}
          />

          {/* Querétaro - Norte del centro */}
          <circle
            cx="370" cy="285"
            r={hoveredState === 'Querétaro' ? "25" : "21"}
            fill={estadosActivos['Querétaro'].color}
            opacity={hoveredState === 'Querétaro' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Querétaro')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Querétaro' ? `drop-shadow(0 0 12px ${estadosActivos['Querétaro'].color})` : 'none' }}
          />

          {/* Hidalgo - Noreste del centro */}
          <circle
            cx="430" cy="280"
            r={hoveredState === 'Hidalgo' ? "23" : "19"}
            fill={estadosActivos['Hidalgo'].color}
            opacity={hoveredState === 'Hidalgo' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Hidalgo')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Hidalgo' ? `drop-shadow(0 0 12px ${estadosActivos['Hidalgo'].color})` : 'none' }}
          />

          {/* Puebla - Este del centro */}
          <circle
            cx="460" cy="330"
            r={hoveredState === 'Puebla' ? "22" : "18"}
            fill={estadosActivos['Puebla'].color}
            opacity={hoveredState === 'Puebla' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Puebla')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Puebla' ? `drop-shadow(0 0 12px ${estadosActivos['Puebla'].color})` : 'none' }}
          />

          {/* Estado de México - Alrededor de CDMX */}
          <circle
            cx="390" cy="300"
            r={hoveredState === 'Estado de México' ? "24" : "20"}
            fill={estadosActivos['Estado de México'].color}
            opacity={hoveredState === 'Estado de México' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Estado de México')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Estado de México' ? `drop-shadow(0 0 12px ${estadosActivos['Estado de México'].color})` : 'none' }}
          />

          {/* Nuevo León - Norte */}
          <circle
            cx="480" cy="160"
            r={hoveredState === 'Nuevo León' ? "24" : "20"}
            fill={estadosActivos['Nuevo León'].color}
            opacity={hoveredState === 'Nuevo León' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Nuevo León')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Nuevo León' ? `drop-shadow(0 0 12px ${estadosActivos['Nuevo León'].color})` : 'none' }}
          />

          {/* Jalisco - Oeste */}
          <circle
            cx="250" cy="300"
            r={hoveredState === 'Jalisco' ? "23" : "19"}
            fill={estadosActivos['Jalisco'].color}
            opacity={hoveredState === 'Jalisco' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Jalisco')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Jalisco' ? `drop-shadow(0 0 12px ${estadosActivos['Jalisco'].color})` : 'none' }}
          />

          {/* Guanajuato - Centro-oeste */}
          <circle
            cx="320" cy="280"
            r={hoveredState === 'Guanajuato' ? "22" : "18"}
            fill={estadosActivos['Guanajuato'].color}
            opacity={hoveredState === 'Guanajuato' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Guanajuato')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Guanajuato' ? `drop-shadow(0 0 12px ${estadosActivos['Guanajuato'].color})` : 'none' }}
          />

          {/* San Luis Potosí - Centro-norte */}
          <circle
            cx="400" cy="230"
            r={hoveredState === 'San Luis Potosí' ? "21" : "17"}
            fill={estadosActivos['San Luis Potosí'].color}
            opacity={hoveredState === 'San Luis Potosí' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('San Luis Potosí')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'San Luis Potosí' ? `drop-shadow(0 0 12px ${estadosActivos['San Luis Potosí'].color})` : 'none' }}
          />

          {/* Aguascalientes - Pequeño en el centro-oeste */}
          <circle
            cx="290" cy="270"
            r={hoveredState === 'Aguascalientes' ? "20" : "16"}
            fill={estadosActivos['Aguascalientes'].color}
            opacity={hoveredState === 'Aguascalientes' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Aguascalientes')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Aguascalientes' ? `drop-shadow(0 0 12px ${estadosActivos['Aguascalientes'].color})` : 'none' }}
          />

          {/* Veracruz - Este */}
          <circle
            cx="500" cy="310"
            r={hoveredState === 'Veracruz' ? "20" : "16"}
            fill={estadosActivos['Veracruz'].color}
            opacity={hoveredState === 'Veracruz' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Veracruz')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Veracruz' ? `drop-shadow(0 0 12px ${estadosActivos['Veracruz'].color})` : 'none' }}
          />

          {/* Michoacán - Suroeste */}
          <circle
            cx="280" cy="330"
            r={hoveredState === 'Michoacán' ? "19" : "15"}
            fill={estadosActivos['Michoacán'].color}
            opacity={hoveredState === 'Michoacán' ? "1" : "0.8"}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredState('Michoacán')}
            onMouseLeave={() => setHoveredState(null)}
            style={{ filter: hoveredState === 'Michoacán' ? `drop-shadow(0 0 12px ${estadosActivos['Michoacán'].color})` : 'none' }}
          />
        </g>

        {/* Tooltip */}
        {hoveredState && (
          <g>
            <rect
              x="550" y="30"
              width="220"
              height="70"
              fill="#1e293b"
              stroke={estadosActivos[hoveredState].color}
              strokeWidth="2"
              rx="8"
              opacity="0.98"
            />
            <text
              x="660" y="60"
              fill="white"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              {hoveredState}
            </text>
            <text
              x="660" y="82"
              fill={estadosActivos[hoveredState].color}
              fontSize="14"
              textAnchor="middle"
            >
              {estadosActivos[hoveredState].proyectos} proyectos
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

export default function TeseoLanding() {
  const [selectedService, setSelectedService] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)

  // Estados para Calculadora ROI - Estilo DatAlpine
  const [inversionTotal, setInversionTotal] = useState(10000000) // $10M inicial
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({
    expansion: false,
    inversion: false,
    agenteVertical: false,
    leadJourney: false,
    mercadoIndustrial: false,
    automatizacion: false
  })

  // Cargar el script de Calendly
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: remover el script al desmontar
      document.body.removeChild(script)
    }
  }, [])

  // Definición de servicios con ROI calculado
  const serviciosROI = {
    expansion: {
      nombre: 'Análisis Data-Econométrico de Expansión',
      costo: 195000,
      roi: 19, // % reducción de riesgo
      tipo: 'Consultoría',
      descripcion: 'Reduce riesgo al elegir la mejor plaza para expandir'
    },
    inversion: {
      nombre: 'Análisis de Inversión',
      costo: 150000,
      roi: 37, // % ganancia en viabilidad
      tipo: 'Consultoría',
      descripcion: 'Determina viabilidad financiera antes de invertir'
    },
    agenteVertical: {
      nombre: 'Agente Vertical (IA)',
      costo: 300000, // $80K + $20K/mes × 11 meses
      roi: 400, // $1.5M ventas / $300K = 400% ROI
      tipo: 'SaaS Anual',
      descripcion: 'Genera $1.5M en ventas con leads calificados por IA'
    },
    leadJourney: {
      nombre: 'AI CRM Lead Journey',
      costo: 300000, // $80K + $20K/mes × 11 meses
      roi: 464, // $2.088M ventas extra / $300K = 464% ROI
      tipo: 'SaaS Anual',
      descripcion: 'Aumenta 17% presentaciones, genera $2M+ ventas extra'
    },
    mercadoIndustrial: {
      nombre: 'Análisis de Mercado Industrial',
      costo: 220000,
      roi: 445, // $1.2M ahorro / $220K = 445% ROI
      tipo: 'Consultoría',
      descripcion: 'Ahorra $1.2M/año en compras optimizadas'
    },
    automatizacion: {
      nombre: 'Automatización Comercial',
      costo: 140000,
      roi: 112, // $157K ahorro + ventas / $140K = 112% ROI
      tipo: 'Consultoría',
      descripcion: 'Reduce 46% vendedores, aumenta 14% visitas'
    }
  }

  // Cálculos dinámicos de ROI
  const calcularImpacto = () => {
    let costoTotal = 0
    let gananciaTotal = 0
    const desglose = []

    Object.keys(serviciosSeleccionados).forEach(key => {
      if (serviciosSeleccionados[key]) {
        const servicio = serviciosROI[key]
        const costo = servicio.costo
        const ganancia = (costo * servicio.roi) / 100

        costoTotal += costo
        gananciaTotal += ganancia

        desglose.push({
          nombre: servicio.nombre,
          tipo: servicio.tipo,
          costo,
          roi: servicio.roi,
          ganancia
        })
      }
    })

    const roiTotal = costoTotal > 0 ? ((gananciaTotal / costoTotal) * 100).toFixed(0) : 0
    const beneficioNeto = gananciaTotal - costoTotal

    return {
      costoTotal,
      gananciaTotal,
      roiTotal: parseInt(roiTotal),
      beneficioNeto,
      desglose
    }
  }

  const impacto = calcularImpacto()

  // Datos para gráfica
  const proyeccionGanancia = [
    { mes: 0, inversion: inversionTotal / 1000000, ganancia: 0, neto: -(impacto.costoTotal / 1000000) },
    { mes: 12, inversion: 0, ganancia: impacto.gananciaTotal / 1000000, neto: impacto.beneficioNeto / 1000000 },
    { mes: 24, inversion: 0, ganancia: (impacto.gananciaTotal * 2) / 1000000, neto: (impacto.beneficioNeto * 2) / 1000000 }
  ]

  // Hero Section Data
  const heroStats = [
    { value: '+18', label: 'Años de Experiencia', icon: Trophy },
    { value: '+3M', label: 'Puntos de Datos', icon: Database },
    { value: '+50', label: 'Bases de Datos', icon: Boxes },
    { value: '+130', label: 'Proyectos Completados', icon: Target }
  ]

  // Services Data - Teseo Core Services
  const services = [
    {
      icon: MapPin,
      nombre: 'Análisis Data-Econométrico de Expansión',
      tagline: 'Elige dónde expandir sin riesgo',
      link: '/servicios/expansion',
      descripcion: 'Identifica las mejores plazas para expandir tu negocio. Analizamos demanda, competencia, rentabilidad y riesgo para recomendarte exactamente dónde invertir y dónde no.',
      metricas: [
        { label: 'Precisión', value: '397%', sublabel: 'ROI Querétaro (Cayco)' },
        { label: 'Entrega', value: '20-25 días', sublabel: 'análisis completo' },
        { label: 'Capas', value: '5', sublabel: 'modelos integrados' }
      ],
      caracteristicas: [
        'Ranking de plazas ordenadas por potencial de ROI',
        'Proyecciones de demanda y competencia por ubicación',
        'Cálculo automático de rentabilidad y punto de equilibrio',
        'Análisis de riesgo con escenarios optimista y pesimista',
        'Recomendación GO/NO-GO por plaza (evita inversiones equivocadas)'
      ],
      pricing: 'Desde $195,000 MXN por proyecto',
      timeline: 'Entrega: 20-25 días hábiles',
      color: 'teseo',
      badge: 'Estratégico',
      example: 'Cayco Concretos: Análisis de viabilidad de expansión en Querétaro, Tula y Huauchinango'
    },
    {
      icon: Microscope,
      nombre: 'Análisis de Inversión',
      tagline: 'Valida si tu inversión es rentable',
      link: '/servicios/inversion',
      descripcion: 'Antes de invertir, sabe exactamente cuánto dinero ganarás, cuándo lo recuperarás y qué riesgos existen. Simulamos tres escenarios para que tomes la mejor decisión.',
      metricas: [
        { label: 'ROI', value: '60.7%', sublabel: 'proyección Huauchinango' },
        { label: 'Entrega', value: '15-20 días', sublabel: 'análisis completo' },
        { label: 'Escenarios', value: '3+', sublabel: 'Base, Optimista, Pesimista' }
      ],
      caracteristicas: [
        'Proyección de ROI y punto de equilibrio (cuándo recuperas tu dinero)',
        'Simulaciones de escenarios: optimista, realista y pesimista',
        'Identificación de variables clave que afectan tu rentabilidad',
        'Análisis de demanda, competencia y flujos de caja proyectados',
        'Reporte ejecutivo listo para presentar a accionistas o bancos'
      ],
      pricing: 'Desde $150,000 MXN por proyecto',
      timeline: 'Entrega: 15-20 días hábiles',
      color: 'success',
      badge: 'Financiero',
      example: 'Inversionista: Evaluación de cancha de pádel en Pachuca con análisis demográfico y de demanda'
    },
    {
      icon: Factory,
      nombre: 'Análisis de Mercado Industrial',
      tagline: 'Entiende tu industria como nadie',
      link: '/servicios/mercado-industrial',
      descripcion: 'Análisis profundo de tu industria con +3M datos de 50+ fuentes. Proyecciones de crecimiento, identificación de oportunidades y análisis de competidores para tomar decisiones estratégicas de largo plazo.',
      metricas: [
        { label: 'Data Points', value: '+3M', sublabel: 'fuentes integradas' },
        { label: 'Entrega', value: '25-30 días', sublabel: 'reporte completo' },
        { label: 'CAGR', value: '8.3%', sublabel: 'proyección concreto 2033' }
      ],
      caracteristicas: [
        'Proyecciones de volumen y valor del mercado a 5-10 años',
        'Benchmarking detallado: competidores, precios, participación de mercado',
        'Identificación de regiones con mayor potencial (hotspots)',
        'Análisis de factores que impulsan el crecimiento (drivers)',
        'Recomendaciones estratégicas ejecutivas con datos sólidos'
      ],
      pricing: 'Desde $220,000 MXN por proyecto',
      timeline: 'Entrega: 25-30 días hábiles',
      color: 'warning',
      badge: 'Industrial',
      example: 'AMCI: Perspectivas del Mercado de Concreto en México 2025 con proyecciones 2026-2028'
    },
    {
      icon: BarChart3,
      nombre: 'Análisis de Mercado',
      tagline: 'Descubre a quiénes venderles y cómo',
      link: '/servicios/mercado',
      descripcion: 'Entiende tu mercado target: quiénes son, qué necesitan, cuántos son y cómo llegar a ellos. Incluye análisis de competencia y estrategias comprobadas de entrada al mercado.',
      metricas: [
        { label: 'Fuentes', value: '50+', sublabel: 'bases de datos' },
        { label: 'Entrega', value: '18-22 días', sublabel: 'análisis completo' },
        { label: 'Precisión', value: '<5%', sublabel: 'margen de error' }
      ],
      caracteristicas: [
        'Tamaño exacto de tu mercado potencial (TAM)',
        'Perfil detallado de clientes ideales: edad, ingresos, hábitos',
        'Análisis de competidores y tu posicionamiento',
        'Proyecciones de demanda y oportunidades de crecimiento',
        'Dashboard con datos actualizables para monitoreo continuo'
      ],
      pricing: 'Desde $180,000 MXN por proyecto',
      timeline: 'Entrega: 18-22 días hábiles',
      color: 'tech',
      badge: 'Mercado',
      example: 'Análisis de mercado de manufactura aeroespacial en el Bajío con evaluación de nearshoring'
    },
    {
      icon: Target,
      nombre: 'Agente Vertical',
      tagline: 'IA que encuentra tus clientes potenciales',
      link: '/servicios/agente-vertical',
      descripcion: 'IA identifica automáticamente tus mejores oportunidades de venta. Te da una base de clientes calificados listos para contactar, sin costo inicial: pagamos juntos por resultados.',
      metricas: [
        { label: 'ROI', value: 'Alto', sublabel: 'conversión Sherwin Williams' },
        { label: 'Modelo', value: 'Revenue Share', sublabel: 'sin costo inicial' },
        { label: 'Entrega', value: 'Continua', sublabel: 'dashboard actualizado' }
      ],
      caracteristicas: [
        'Base de datos de clientes potenciales con puntuación de compra',
        'Segmentación automática: Tier A (listos para vender), B y C',
        'Dashboard en tiempo real para monitorear oportunidades',
        'Actualización mensual automática con nuevos prospectos',
        'Modelo sin riesgo: solo pagas comisión sobre ventas realizadas'
      ],
      pricing: 'Modelo revenue share (sin costo inicial)',
      timeline: 'Entrega: Continua con actualizaciones',
      color: 'teseo',
      badge: 'Innovador',
      example: 'Sherwin Williams: Prospección de clientes potenciales con alto ROI de conversión'
    }
  ]

  // Case Studies (datos para uso futuro)
  const _caseStudies = [
    {
      client: 'Cayco Concretos',
      sector: 'Construcción',
      challenge: 'Evaluar viabilidad de expansión en 3 plazas estratégicas',
      solution: 'Modelo econométrico de 5 capas con análisis de demanda, oferta, saturación, ROI y VPN',
      result: 'ROI proyectado 397.4% en Querétaro; recomendación de desinversión en Huauchinango',
      icon: Factory,
      color: 'warning'
    },
    {
      client: 'AMCI',
      sector: 'Industria del Concreto',
      challenge: 'Análisis competitivo y tendencias del mercado de concreto premezclado',
      solution: 'Estudio de mercado con 3M+ datos, análisis de 27M m³ de producción nacional',
      result: 'Identificación de nearshoring como catalizador; proyección CAGR 8.3% hasta 2033',
      icon: Boxes,
      color: 'tech'
    },
    {
      client: 'Inversionista Privado',
      sector: 'Deporte y Ocio',
      challenge: 'Determinar viabilidad de cancha de pádel en Pachuca',
      solution: 'Análisis demográfico, competitivo, de demanda y sensibilidad con datos INEGI y MOPRADEF',
      result: 'Identificación de segmento 18-35 años (67%); oportunidad en mercado femenino',
      icon: Users,
      color: 'success'
    }
  ]

  // Metodología Avanzada
  const methodology = [
    {
      step: '01',
      title: 'Recopilación y ETL',
      description: 'Integración masiva de datos con pipelines automatizados en Python/SQL',
      techs: ['Python', 'SQL', 'pandas', 'SQLAlchemy'],
      sources: '50+ fuentes oficiales + bases propietarias (3M+ registros)',
      icon: Database,
      color: 'tech',
      metrics: [
        { label: '50+', sublabel: 'fuentes integradas' },
        { label: '3M+', sublabel: 'data points' }
      ]
    },
    {
      step: '02',
      title: 'Feature Engineering',
      description: 'Creación de variables derivadas con transformaciones matemáticas avanzadas',
      techs: ['numpy', 'scikit-learn', 'statsmodels'],
      sources: '+50 features: log, diferencias, ratios, moving avg, encodings',
      icon: Brain,
      color: 'warning',
      metrics: [
        { label: '+50', sublabel: 'variables creadas' },
        { label: '100%', sublabel: 'missing handled' }
      ]
    },
    {
      step: '03',
      title: 'Modelado Econométrico',
      description: 'Cointegración de Johansen, VAR/VECM, ARIMA, regresión hedónica',
      techs: ['statsmodels', 'arch', 'linearmodels'],
      sources: 'Modelos econométricos para series temporales y equilibrio',
      icon: TrendingUp,
      color: 'teseo',
      metrics: [
        { label: 'R² > 0.85', sublabel: 'ajuste modelo' },
        { label: '<5%', sublabel: 'RMSE' }
      ],
      equation: 'ΔP_t = α + β₁ΔX_t + β₂ΔY_t + λECT_{t-1} + ε_t'
    },
    {
      step: '04',
      title: 'Machine Learning',
      description: 'Random Forest, XGBoost, LightGBM, redes neuronales para patrones no-lineales',
      techs: ['XGBoost', 'LightGBM', 'TensorFlow', 'PyTorch'],
      sources: 'Ensemble de modelos con optimización de hiperparámetros',
      icon: Zap,
      color: 'success',
      metrics: [
        { label: '95%', sublabel: 'precisión' },
        { label: 'k=5', sublabel: 'cross-validation' }
      ]
    },
    {
      step: '05',
      title: 'Simulaciones Monte Carlo',
      description: 'Análisis de riesgo con 10,000 iteraciones para intervalos de confianza',
      techs: ['scipy', 'numpy.random', 'Monte Carlo'],
      sources: 'Simulaciones estocásticas para cuantificar incertidumbre',
      icon: LineChart,
      color: 'warning',
      metrics: [
        { label: '10K', sublabel: 'iteraciones' },
        { label: '95%', sublabel: 'intervalo confianza' }
      ]
    },
    {
      step: '06',
      title: 'Validación y Backtesting',
      description: 'K-fold validation, backtesting histórico, bootstrap con 1000 muestras',
      techs: ['sklearn.model_selection', 'backtesting'],
      sources: 'Pruebas de robustez y validación ex-post con datos reales',
      icon: Shield,
      color: 'success',
      metrics: [
        { label: 'R² > 0.85', sublabel: 'validado' },
        { label: '1000', sublabel: 'bootstrap samples' }
      ]
    }
  ]

  // Data Sources con iconos específicos
  const dataSources = [
    {
      name: 'INEGI',
      fullName: 'Instituto Nacional de Estadística y Geografía',
      icon: '📊',
      color: 'tech',
      description: 'Censos, DENUE, estadísticas oficiales México'
    },
    {
      name: 'DENUE',
      fullName: 'Directorio Estadístico Nacional de Unidades Económicas',
      icon: '🏢',
      color: 'warning',
      description: 'Base de empresas activas por sector'
    },
    {
      name: 'Banco Mundial',
      fullName: 'World Bank Data',
      icon: '🌍',
      color: 'tech',
      description: 'Indicadores macroeconómicos globales'
    },
    {
      name: 'Bloomberg Terminal',
      fullName: 'Financial Markets Data',
      icon: '💹',
      color: 'success',
      description: 'Precios de commodities y mercados financieros'
    },
    {
      name: 'BBVA Research',
      fullName: 'Economic Analysis',
      icon: '🏦',
      color: 'teseo',
      description: 'Análisis económico y proyecciones México'
    },
    {
      name: 'DataMéxico',
      fullName: 'Secretaría de Economía',
      icon: '🇲🇽',
      color: 'warning',
      description: 'Datos sectoriales y comercio exterior'
    },
    {
      name: 'AMCI',
      fullName: 'Asociación Mexicana de Concreteros Independientes',
      icon: '🏗️',
      color: 'tech',
      description: 'Estadísticas industria del concreto'
    },
    {
      name: 'CMIC',
      fullName: 'Cámara Mexicana de la Industria de la Construcción',
      icon: '🏭',
      color: 'success',
      description: 'Indicadores de construcción nacional'
    }
  ]

  // Divisions
  const divisions = [
    {
      name: 'DatAlpine',
      tagline: 'Inteligencia Inmobiliaria',
      description: 'Plataforma de simulación financiera para desarrolladores inmobiliarios',
      icon: Home,
      color: 'teseo',
      action: () => window.open('https://datalpine.mx/', '_blank')
    }
  ]

  // Testimonials - Testimonios de Clientes
  const testimonials = [
    {
      name: 'Directivo',
      position: '',
      company: 'Cayco Concretos',
      image: '👤',
      rating: 5,
      quote: 'El análisis de Teseo nos ayudó a identificar Querétaro como plaza prioritaria con ROI proyectado de 397%. Evitamos una inversión equivocada en Huauchinango que hubiera sido un error costoso. Su modelo de 5 capas es increíblemente preciso.',
      metric: 'ROI 397%',
      color: 'warning'
    },
    {
      name: 'Presidente',
      position: '',
      company: 'AMCI',
      image: '👤',
      rating: 5,
      quote: 'El estudio de mercado del concreto con 3M+ data points nos dio una perspectiva única del nearshoring. Las proyecciones con CAGR 8.3% hasta 2033 son fundamentales para nuestra planeación estratégica de largo plazo.',
      metric: 'CAGR 8.3%',
      color: 'tech'
    },
    {
      name: 'Inversionista',
      position: '',
      company: 'Proyecto Pádel Pachuca',
      image: '👤',
      rating: 5,
      quote: 'El análisis demográfico identificó el segmento 18-35 años (67% del mercado) y reveló una oportunidad en mercado femenino que no habíamos considerado. ROI proyectado 60.7% validado con múltiples escenarios. Inversión recuperada.',
      metric: 'ROI 60.7%',
      color: 'success'
    },
    {
      name: 'Ejecutivo',
      position: '',
      company: 'Sherwin Williams México',
      image: '👤',
      rating: 5,
      quote: 'El Agente Vertical con IA identificó prospectos con 85% de propensión de compra. Conversión tier A: 42% vs 12% baseline. Reducción de CAC en 60%. El modelo revenue share alinea incentivos perfectamente.',
      metric: 'Conversión +350%',
      color: 'teseo'
    }
  ]

  // Pricing Comparison - Tabla comparativa de servicios (datos para uso futuro)
  const _pricingTable = [
    {
      service: 'Análisis de Inversión',
      icon: Microscope,
      price: '$150K - $180K',
      timeline: '15-20 días',
      color: 'success',
      features: [
        'Análisis de viabilidad financiera',
        'ROI, TIR, VPN, EBITDA',
        'Análisis de sensibilidad (3 escenarios)',
        'Proyecciones 5-10 años',
        'Reporte PDF 80-100 págs',
        'Dashboard Excel interactivo',
        'Presentación PPT ejecutiva',
        'Sesión Q&A 2h',
        'Soporte 30 días'
      ]
    },
    {
      service: 'Análisis de Mercado',
      icon: BarChart3,
      price: '$180K - $220K',
      timeline: '18-22 días',
      color: 'tech',
      features: [
        'Análisis demográfico completo',
        'Tamaño de mercado (TAM/SAM/SOM)',
        'Análisis competitivo profundo',
        'Proyecciones de demanda',
        'Reporte PDF 60-80 págs',
        'Dashboards Excel editables',
        'Presentación PPT 35 slides',
        'Sesión Q&A 2h',
        'Soporte 60 días'
      ]
    },
    {
      service: 'Análisis de Expansión',
      icon: MapPin,
      price: '$195K - $240K',
      timeline: '20-25 días',
      color: 'teseo',
      badge: 'Popular',
      features: [
        'Modelo de 5 capas (Demanda/Oferta/Saturación/Oportunidad/ROI)',
        'Scoring de ubicaciones óptimas',
        'Análisis económico e industrial',
        'Proyecciones por plaza',
        'Reporte PDF 100+ págs',
        'Dashboard interactivo',
        'Mapas GIS con heat maps',
        'Sesión Q&A 2h',
        'Soporte 30 días'
      ]
    },
    {
      service: 'Análisis Industrial',
      icon: Factory,
      price: '$220K - $350K',
      timeline: '25-30 días',
      color: 'warning',
      features: [
        'Procesamiento 3M+ data points',
        'Modelos econométricos avanzados',
        'Proyecciones volumen y valor',
        'Análisis competitivo exhaustivo',
        'Reporte PDF 80-120 págs',
        'Dashboards Excel avanzados',
        'Presentación PPT 50 slides',
        'Sesión Q&A 2h',
        'Soporte 60 días + actualizaciones'
      ]
    },
    {
      service: 'Agente Vertical (IA)',
      icon: Target,
      price: 'Revenue Share',
      timeline: 'Continuo',
      color: 'teseo',
      badge: 'Sin costo inicial',
      features: [
        'Modelo de IA con score 0-100',
        'Base de datos calificada',
        'Segmentación tier A/B/C',
        'Dashboard 24/7 en tiempo real',
        'Actualización mensual automática',
        'Integración CRM',
        'Reportes mensuales de performance',
        'Soporte continuo',
        'Solo pagas por resultados (% ventas)'
      ]
    }
  ]

  // FAQ - Preguntas Frecuentes (Actualizado y Ampliado)
  const faqs = [
    // Sección 1: Precios y Modelo de Negocio
    {
      question: '¿Cuánto cuesta un análisis de Teseo Data Lab?',
      answer: (
        <div className="space-y-4">
          <p className="text-industrial-300">
            Modelo de pricing flat por proyecto según tipo de servicio:
          </p>
          <ul className="space-y-2 list-disc list-inside text-industrial-300">
            <li><span className="font-semibold text-white">Análisis de Inversión Inmobiliaria:</span> $150K MXN</li>
            <li><span className="font-semibold text-white">Análisis Data-Econométrico de Expansión:</span> $280K MXN</li>
            <li><span className="font-semibold text-white">Estudio de Mercado:</span> $200K MXN</li>
            <li><span className="font-semibold text-white">Análisis de Mercado Industrial:</span> $350K MXN</li>
            <li><span className="font-semibold text-white">Lead Journey Mapping:</span> $120K MXN</li>
            <li><span className="font-semibold text-white">Agente Vertical IA:</span> $0 inicial con revenue share 12-18% sobre ventas generadas</li>
          </ul>
          <div className="p-4 bg-teseo-500/10 border border-teseo-500/30 rounded-lg mt-4">
            <p className="text-sm text-industrial-300">
              <span className="font-semibold text-white">Sin mensualidades.</span> Todos incluyen: reporte completo, código fuente, dashboard interactivo, y sesión Q&A.
            </p>
          </div>
        </div>
      )
    },
    {
      question: '¿Cómo funciona el pago? ¿Hay mensualidades o es pago único?',
      answer: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-industrial-800/50 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Proyectos One-Time</h4>
              <ul className="space-y-2 list-disc list-inside text-sm text-industrial-300">
                <li>Pago único (sin mensualidades)</li>
                <li>50% al inicio del proyecto</li>
                <li>50% en entrega final</li>
                <li>30-60 días soporte incluido</li>
              </ul>
            </div>
            <div className="p-4 bg-tech-500/10 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Agente Vertical IA</h4>
              <ul className="space-y-2 list-disc list-inside text-sm text-industrial-300">
                <li>Sin costo inicial</li>
                <li>Revenue share: % de ventas generadas</li>
                <li>Soporte continuo incluido</li>
                <li>Actualizaciones mensuales automáticas</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-success-500/10 border border-success-500/30 rounded-lg">
            <p className="text-sm text-industrial-300">
              <span className="font-semibold text-white">Medios de pago:</span> Transferencia bancaria, facturamos con RFC. Aceptamos empresas e individuos.
            </p>
          </div>
        </div>
      )
    },
    {
      question: '¿En qué se diferencia Teseo de consultoras tradicionales?',
      answer: (
        <div className="space-y-4">
          <p className="text-industrial-300 font-semibold">Diferenciadores clave:</p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Entregables Técnicos</p>
                <p className="text-sm text-industrial-300">Código fuente y modelos ejecutables (no solo PowerPoint)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Dashboards Interactivos</p>
                <p className="text-sm text-industrial-300">Que TÚ puedes actualizar en tiempo real</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Validación Estadística</p>
                <p className="text-sm text-industrial-300">Rigurosa (R² &gt; 0.85 garantizado)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Pricing Transparente</p>
                <p className="text-sm text-industrial-300">Sin retainers mensuales ni hidden costs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Equipo Técnico</p>
                <p className="text-sm text-industrial-300">Data Scientists con maestría, no solo consultores MBA</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Revenue Share Disponible</p>
                <p className="text-sm text-industrial-300">Sin costo inicial para servicios de prospección</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
              <div>
                <p className="font-semibold text-white">Experiencia Comprobable</p>
                <p className="text-sm text-industrial-300">18+ años con resultados verificables</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Sección 2: Resultados y Experiencia
    {
      question: '¿Qué resultados puedo esperar? ¿Tienen casos de éxito?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Resultados comprobados con clientes:</p>
          <ul className="space-y-2 list-disc list-inside text-industrial-300">
            <li>Reducción 40% en CAC (Customer Acquisition Cost)</li>
            <li>Incremento 35% en conversión de leads</li>
            <li>ROI 12x en campañas de prospección con IA</li>
            <li>Identificación de 25+ leads B2B calificados mensuales</li>
          </ul>
          <div className="p-4 bg-warning-500/10 rounded-lg border border-warning-500/20 mt-4">
            <p className="font-semibold text-white mb-2">Casos destacados:</p>
            <ul className="space-y-2 list-disc list-inside text-sm text-industrial-300">
              <li>Desarrolladora inmobiliaria: aumentó velocidad de venta 28% con análisis de mercado</li>
              <li>Empresa industrial: evitó expansión mal dirigida ahorrando $8M MXN</li>
            </ul>
          </div>
          <p className="text-sm text-success-400 font-semibold">
            ✓ Garantizamos métricas (R² &gt; 0.85) o ajustamos sin costo
          </p>
        </div>
      )
    },
    {
      question: '¿Quién hace los análisis? ¿Qué experiencia tiene el equipo?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Equipo multidisciplinario:</p>
          <ul className="space-y-3 list-disc list-inside text-industrial-300">
            <li>
              <span className="font-semibold text-white">Data Scientists</span> con maestría en econometría y machine learning
            </li>
            <li>
              <span className="font-semibold text-white">Analistas de Mercado</span> con 10+ años de experiencia en inteligencia comercial
            </li>
            <li>
              <span className="font-semibold text-white">Ingenieros de Software</span> especializados en BI y dashboards
            </li>
          </ul>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-industrial-800/50 rounded-lg">
              <p className="text-sm font-semibold text-white mb-2">Experiencia:</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>18+ años (desde 2006)</li>
                <li>Deloitte, Accenture</li>
                <li>Banco de México</li>
                <li>Roche</li>
                <li>UMass</li>
              </ul>
            </div>
            <div className="p-4 bg-tech-500/10 rounded-lg">
              <p className="text-sm font-semibold text-white mb-2">Publicaciones:</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>Revistas académicas</li>
                <li>Econometría aplicada</li>
                <li>Análisis predictivo</li>
                <li>Series de tiempo</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Sección 3: Proceso y Timeline
    {
      question: '¿Cuál es el proceso completo desde que los contacto?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">7 pasos del proceso:</p>
          <div className="space-y-3">
            {[
              { num: '1', title: 'Consulta Gratuita', desc: '30 min para entender tu necesidad' },
              { num: '2', title: 'Propuesta Técnica', desc: 'Cotización en 48h' },
              { num: '3', title: 'Kick-off', desc: 'Firma de NDA y pago inicial 50%' },
              { num: '4', title: 'Desarrollo', desc: '15-30 días según servicio' },
              { num: '5', title: 'Presentación', desc: 'Resultados preliminares + Q&A' },
              { num: '6', title: 'Entrega Final', desc: 'Reporte, código, dashboard' },
              { num: '7', title: 'Soporte', desc: '30-60 días post-entrega' }
            ].map((paso, i) => (
              <div key={i} className="flex gap-4 p-3 bg-industrial-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-teseo-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-teseo-400 font-bold text-sm">{paso.num}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{paso.title}</p>
                  <p className="text-xs text-industrial-400">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      question: '¿Cuánto tiempo toma completar un análisis?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Timelines por servicio:</p>
          <div className="space-y-2">
            {[
              { service: 'Análisis de Inversión Inmobiliaria', days: '15-20' },
              { service: 'Estudio de Mercado', days: '18-22' },
              { service: 'Análisis Data-Econométrico de Expansión', days: '20-25' },
              { service: 'Análisis de Mercado Industrial', days: '25-30' },
              { service: 'Lead Journey Mapping', days: '12-15' },
              { service: 'Agente Vertical IA', days: 'Setup 10 días + entregas mensuales' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-industrial-800/30 rounded-lg">
                <span className="text-sm text-industrial-300">{item.service}</span>
                <span className="text-sm font-semibold text-teseo-400">{item.days} días hábiles</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-success-400 mt-4">
            ✓ Todos incluyen validación rigurosa (R² &gt; 0.85) y sesión de presentación
          </p>
        </div>
      )
    },

    // Sección 4: Alcance y Cobertura
    {
      question: '¿Solo trabajan en México o también a nivel internacional?',
      answer: (
        <div className="space-y-4">
          <p className="text-industrial-300">
            Operamos principalmente en <span className="font-semibold text-white">México con presencia en 12 estados</span>, pero también atendemos proyectos en:
          </p>
          <ul className="space-y-1 list-disc list-inside text-industrial-300">
            <li>Colombia</li>
            <li>Chile</li>
            <li>Perú</li>
            <li>Estados Unidos</li>
          </ul>
          <div className="p-4 bg-tech-500/10 rounded-lg border border-tech-500/20 mt-4">
            <p className="text-sm text-industrial-300">
              <span className="font-semibold text-white">Análisis aplicables:</span> Nuestros estudios de expansión y análisis de mercado funcionan en cualquier región con datos históricos disponibles.
            </p>
            <p className="text-sm text-industrial-300 mt-2">
              <span className="font-semibold text-white">Fuentes internacionales:</span> INEGI, Banco Mundial, censos económicos locales
            </p>
          </div>
        </div>
      )
    },
    {
      question: '¿Para qué tamaño de empresa trabajan? ¿Qué industrias?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Perfil ideal de cliente:</p>
          <ul className="space-y-2 list-disc list-inside text-industrial-300">
            <li>Desarrolladores inmobiliarios con pipeline $50M+ MXN</li>
            <li>Empresas industriales en expansión (manufactura, logística, distribución)</li>
            <li>Retail y comercio con estrategia multi-ubicación</li>
            <li>Empresas B2B con pipeline comercial estructurado</li>
          </ul>
          <div className="p-4 bg-warning-500/10 rounded-lg border border-warning-500/20 mt-4">
            <p className="text-sm font-semibold text-white mb-2">Industrias:</p>
            <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
              <li>Real Estate y Bienes Raíces</li>
              <li>Manufactura e Industria</li>
              <li>Retail y Comercio</li>
              <li>Logística y Distribución</li>
              <li>Construcción</li>
              <li>Servicios B2B</li>
            </ul>
          </div>
          <p className="text-sm text-industrial-300 mt-4">
            <span className="font-semibold text-white">Presupuesto mínimo recomendado:</span> $5M MXN anuales en ingresos para ROI óptimo del análisis
          </p>
        </div>
      )
    },

    // Sección 5: Aspectos Técnicos
    {
      question: '¿Qué datos necesitan de mi empresa para empezar?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Para kick-off necesitamos:</p>
          <ul className="space-y-2 list-disc list-inside text-industrial-300">
            <li><span className="font-semibold text-white">Contexto de negocio:</span> Industria, mercado objetivo, competidores clave</li>
            <li><span className="font-semibold text-white">Objetivos cuantitativos:</span> Proyección de demanda, ROI de expansión, optimización CAC</li>
            <li><span className="font-semibold text-white">Datos internos disponibles:</span> CRM, transacciones, históricos de ventas</li>
            <li><span className="font-semibold text-white">Timeline y urgencia</span> del proyecto</li>
          </ul>
          <div className="p-4 bg-teseo-500/10 rounded-lg border border-teseo-500/20 mt-4 space-y-3">
            <p className="text-sm text-industrial-300">
              <span className="text-teseo-400 font-semibold">🔒 Confidencialidad:</span> Firmamos NDA antes de compartir información sensible
            </p>
            <p className="text-sm text-industrial-300">
              <span className="text-success-400 font-semibold">✓ Sin datos históricos:</span> Podemos trabajar con datos públicos y benchmarks de industria
            </p>
          </div>
        </div>
      )
    },
    {
      question: '¿Qué tecnologías y modelos utilizan?',
      answer: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-white mb-3">Lenguajes y Frameworks</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>Python (pandas, scikit-learn, statsmodels)</li>
                <li>R</li>
                <li>SQL</li>
                <li>TensorFlow</li>
                <li>PyTorch</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Visualización</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>PowerBI</li>
                <li>Tableau</li>
                <li>Excel (macros automatizadas)</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-industrial-800/50 rounded-lg">
              <p className="font-semibold text-white mb-2 text-sm">Modelos Econométricos</p>
              <ul className="space-y-1 list-disc list-inside text-xs text-industrial-300">
                <li>Cointegración de Johansen</li>
                <li>VAR/VECM</li>
                <li>ARIMA</li>
                <li>Regresión hedónica</li>
                <li>Series de tiempo</li>
              </ul>
            </div>
            <div className="p-4 bg-tech-500/10 rounded-lg">
              <p className="font-semibold text-white mb-2 text-sm">Machine Learning</p>
              <ul className="space-y-1 list-disc list-inside text-xs text-industrial-300">
                <li>Random Forest</li>
                <li>XGBoost</li>
                <li>LightGBM</li>
                <li>Redes neuronales LSTM</li>
                <li>Ensemble learning</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-success-500/10 rounded-lg border border-success-500/20 mt-4">
            <p className="font-semibold text-white mb-2 text-sm">Validación Rigurosa</p>
            <ul className="space-y-1 list-disc list-inside text-xs text-industrial-300">
              <li>K-fold cross-validation</li>
              <li>Backtesting histórico</li>
              <li>Bootstrap (1000 muestras)</li>
              <li>Simulaciones Monte Carlo (10K iteraciones)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      question: '¿Incluyen el código fuente y modelos?',
      answer: (
        <div className="space-y-4">
          <p className="text-success-400 font-semibold mb-4">✓ Sí, todos nuestros proyectos incluyen entrega completa:</p>
          <ul className="space-y-3">
            {[
              { item: 'Código fuente Python/R', desc: 'Documentado con comentarios' },
              { item: 'Notebooks Jupyter', desc: 'Reproducibles paso a paso' },
              { item: 'Modelos entrenados', desc: 'Exportables (.pkl, .h5)' },
              { item: 'Scripts de ETL', desc: 'Y feature engineering' },
              { item: 'Dashboards interactivos', desc: 'PowerBI/Excel que TÚ puedes actualizar' },
              { item: 'Documentación técnica', desc: 'Completa de metodología' }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-industrial-800/30 rounded-lg">
                <span className="text-teseo-400 font-bold flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.item}</p>
                  <p className="text-xs text-industrial-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </ul>
          <p className="text-sm text-industrial-300 mt-4 italic">
            Puedes correr y actualizar los modelos internamente después de la entrega sin depender de nosotros.
          </p>
        </div>
      )
    },
    {
      question: '¿Los modelos se actualizan con nuevos datos automáticamente?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Depende del servicio contratado:</p>
          <div className="space-y-3">
            <div className="p-4 bg-industrial-800/50 rounded-lg">
              <p className="font-semibold text-white mb-2">Análisis One-Time</p>
              <p className="text-sm text-industrial-300">Te entregamos el modelo completo que TÚ puedes actualizar con nuevos datos usando los scripts incluidos</p>
            </div>
            <div className="p-4 bg-tech-500/10 rounded-lg">
              <p className="font-semibold text-white mb-2">Agente Vertical IA</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>Actualizaciones automáticas mensuales incluidas</li>
                <li>Modelo revenue share</li>
              </ul>
            </div>
            <div className="p-4 bg-success-500/10 rounded-lg border border-success-500/20">
              <p className="font-semibold text-white mb-2">Contrato de Mantenimiento (Opcional)</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-industrial-300">
                <li>Actualizaciones trimestrales con nuevos datos</li>
                <li>Re-entrenamiento de modelos</li>
                <li>Ajustes de parámetros</li>
                <li>Capacitación para tu equipo interno</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Sección 6: Seguridad y Soporte
    {
      question: '¿Cómo garantizan la confidencialidad de nuestros datos?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Protocolo de seguridad multi-capa:</p>
          <ul className="space-y-3">
            {[
              { measure: 'NDA', desc: 'Firmamos acuerdo de confidencialidad antes del kick-off' },
              { measure: 'Encriptación', desc: 'AES-256 en almacenamiento de servidores' },
              { measure: 'Acceso Restringido', desc: 'Solo equipo asignado al proyecto' },
              { measure: 'Eliminación', desc: 'Permanente de datos post-entrega si lo solicitas' },
              { measure: 'Sin Compartir', desc: 'Nunca compartimos datos entre clientes' },
              { measure: 'Cumplimiento', desc: 'GDPR y Ley Federal de Protección de Datos México' }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-industrial-800/30 rounded-lg">
                <Shield className="w-5 h-5 text-success-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white text-sm">{item.measure}</p>
                  <p className="text-xs text-industrial-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )
    },
    {
      question: '¿Ofrecen soporte post-entrega?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Soporte post-entrega incluido:</p>
          <div className="space-y-3">
            <div className="p-4 bg-industrial-800/50 rounded-lg">
              <p className="font-semibold text-white mb-2">Análisis One-Time</p>
              <p className="text-sm text-industrial-300 mb-2"><span className="text-warning-400 font-bold">30 días</span> de soporte</p>
              <ul className="space-y-1 list-disc list-inside text-xs text-industrial-300">
                <li>Consultas generales</li>
                <li>Actualizaciones menores de datos</li>
                <li>Ajustes al dashboard</li>
              </ul>
            </div>
            <div className="p-4 bg-tech-500/10 rounded-lg">
              <p className="font-semibold text-white mb-2">Análisis Complejos</p>
              <p className="text-sm text-industrial-300 mb-2"><span className="text-tech-400 font-bold">60 días</span> de soporte</p>
              <ul className="space-y-1 list-disc list-inside text-xs text-industrial-300">
                <li>Consultas avanzadas</li>
                <li>2 sesiones Q&A adicionales</li>
                <li>Ajustes significativos</li>
              </ul>
            </div>
            <div className="p-4 bg-success-500/10 rounded-lg">
              <p className="font-semibold text-white mb-2">Agente Vertical IA</p>
              <p className="text-sm text-industrial-300 mb-2"><span className="text-success-400 font-bold">Continuo</span> incluido</p>
              <p className="text-xs text-industrial-300">En modelo revenue share</p>
            </div>
          </div>
          <div className="p-4 bg-teseo-500/10 border border-teseo-500/20 rounded-lg mt-4">
            <p className="text-sm text-industrial-300">
              <span className="font-semibold text-white">Opción de extensión:</span> Contrato de mantenimiento mensual ($15K-$30K MXN según complejidad)
            </p>
          </div>
        </div>
      )
    },
    {
      question: '¿Cómo validan la precisión de sus modelos?',
      answer: (
        <div className="space-y-4">
          <p className="font-semibold text-white">Validación rigurosa multi-nivel (obligatoria):</p>
          <ul className="space-y-2 list-disc list-inside text-industrial-300 mb-4">
            <li>K-fold cross-validation (k=5) para evitar overfitting</li>
            <li>Backtesting con datos históricos (últimos 12-24 meses)</li>
            <li>Bootstrap con 1000 muestras para intervalos de confianza</li>
            <li>Análisis de residuos y heterocedasticidad</li>
          </ul>
          <div className="p-4 bg-success-500/10 rounded-lg border border-success-500/20">
            <p className="font-semibold text-white mb-3">Métricas cuantitativas garantizadas:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-success-400">R² &gt; 0.85</p>
                <p className="text-xs text-industrial-400">Varianza explicada</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-tech-400">RMSE &lt; 5%</p>
                <p className="text-xs text-industrial-400">Error cuadrático</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-warning-400">MAE</p>
                <p className="text-xs text-industrial-400">Error absoluto medio</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-teseo-400">95% CI</p>
                <p className="text-xs text-industrial-400">Intervalo confianza</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-success-400 font-semibold mt-4">
            ✓ Si no cumplimos métricas comprometidas, ajustamos sin costo adicional
          </p>
        </div>
      )
    }
  ]

  // Filosofía - Nosotros
  const filosofia = {
    tagline: 'Decisiones más inteligentes',
    subtitle: 'Teseo Data Lab, empieza con un equipo más estratégico',
    proposito: {
      title: 'Propósito',
      description: 'Empoderar a industrias especializadas —desde bienes raíces hasta manufactura— con insights accionables y tecnología de vanguardia, co-creando soluciones integrales que generen valor sostenible.'
    },
    vision: {
      title: 'Visión',
      description: 'Convertirnos en el socio estratégico global de referencia en innovación basada en datos, anticipando tendencias y evolucionando continuamente nuestras metodologías para impulsar la competitividad de nuestros clientes.'
    },
    valores: [
      {
        icon: Target,
        title: 'Rigor Analítico',
        description: 'Modelos validados con R² > 0.85, metodologías econométricas rigurosas y backtesting exhaustivo.',
        color: 'teseo'
      },
      {
        icon: Users,
        title: 'Co-creación',
        description: 'Trabajamos hombro a hombro con nuestros clientes, entendiendo sus necesidades y co-diseñando soluciones.',
        color: 'tech'
      },
      {
        icon: Shield,
        title: 'Confidencialidad',
        description: 'NDA en todos los proyectos, encriptación AES-256, cumplimiento GDPR y normativas mexicanas.',
        color: 'warning'
      },
      {
        icon: TrendingUp,
        title: 'Mejora Continua',
        description: 'Actualizamos modelos mensualmente, incorporamos feedback y evolucionamos metodologías continuamente.',
        color: 'success'
      }
    ]
  }

  // Equipo - Team members
  const equipo = [
    {
      name: 'Fundador & CEO',
      role: 'Econometría & Data Science',
      expertise: '18+ años en análisis econométrico, machine learning y consultoría estratégica',
      image: '👤',
      color: 'teseo'
    },
    {
      name: 'Data Scientists',
      role: 'Modelado Avanzado',
      expertise: 'Equipo especializado en econometría, ML/AI, optimización y simulaciones Monte Carlo',
      image: '👥',
      color: 'tech'
    },
    {
      name: 'Engineers',
      role: 'Data Engineering & DevOps',
      expertise: 'Pipeline automatizados (Python/SQL), ETL masivo, dashboards interactivos',
      image: '👥',
      color: 'warning'
    },
    {
      name: 'Consultores Sectoriales',
      role: 'Industria & Mercados',
      expertise: 'Expertos en construcción, manufactura, retail, inmobiliario y servicios B2B',
      image: '👥',
      color: 'success'
    }
  ]

  // Success Stories detalladas
  const successStories = [
    {
      client: 'Cayco Concretos',
      sector: 'Construcción',
      icon: Factory,
      color: 'warning',
      // usar el logo desde public/assets/logos/
      image: (
        <img
          src="/assets/logos/cayco-logo.png"
          alt="Cayco Concretos"
          className="w-50 h-30 object-contain"
        />
      ),
      challenge: 'Análisis de Viabilidad de Expansión en 3 Plazas Estratégicas',
      description: 'Modelo econométrico de 5 capas (Demanda, Oferta, Saturación, Oportunidad, ROI) para evaluar expansión territorial en Querétaro, Tula y Huauchinango. Procesamos +3M data points de INEGI, competencia y proyecciones macroeconómicas.',
      result: 'Recomendación GO en Querétaro con ROI proyectado del 397.4% a 5 años. NO GO en Huauchinango (ROI negativo -15%). Evitamos pérdidas potenciales de +$15M en expansión no viable.',
      metrics: [
        { value: '397%', label: 'ROI Querétaro', before: 'Sin datos', after: '397.4%' },
        { value: '-15%', label: 'ROI Huauchinango', before: 'Inversión planeada', after: 'Desinversión' },
        { value: '+$15M', label: 'Pérdidas evitadas', before: '$0', after: '$15M ahorrados' }
      ],
      timeline: '22 días',
      service: 'Análisis Data-Econométrico de Expansión'
    },
    {
      client: 'AMCI',
      sector: 'Industria del Concreto',
      icon: Building2,
      color: 'tech',
      image: (
        <img
          src="/assets/logos/amci-logo.png"
          alt="AMCI"
          className="w-50 h-30 object-contain"
        />
      ),
      challenge: 'Perspectivas del Mercado de Concreto Premezclado en México 2025',
      description: 'Estudio exhaustivo del mercado mexicano de concreto con +3M data points, análisis de 27M m³ de producción nacional, proyecciones econométricas hasta 2033, y evaluación del impacto del nearshoring como catalizador.',
      result: 'Identificación de CAGR 8.3% proyectado hasta 2033. Nearshoring confirmado como principal driver de crecimiento. Hotspots estratégicos en Bajío y Norte. Reporte presentado en 4 reuniones nacionales (Tijuana, Hermosillo, Puebla, SLP, Guadalajara).',
      metrics: [
        { value: '8.3%', label: 'CAGR 2025-2033', before: 'Sin proyección', after: 'CAGR 8.3%' },
        { value: '27M m³', label: 'Producción analizada', before: 'Datos dispersos', after: '27M m³ integrados' },
        { value: '4', label: 'Eventos nacionales', before: '0', after: '4 reuniones' }
      ],
      timeline: '28 días',
      service: 'Análisis de Mercado Industrial'
    },
    {
      client: 'Sherwin Williams México',
      sector: 'Manufactura',
      icon: Zap,
      color: 'teseo',
      image: (
        <img
          src="/assets/logos/sherwin-williams-logo.png"
          alt="Sherwin Williams México"
          className="w-50 h-30 object-contain"
        />
      ),
      challenge: 'Agente Vertical con IA para Prospección de Clientes B2B',
      description: 'Modelo de IA con score 0-100 para identificar prospectos con alta propensión de compra. Segmentación tier A/B/C, scoring predictivo, y base de datos calificada de +40K registros con actualización automática mensual.',
      result: 'Conversión tier A del 42% vs 12% baseline (+350%). Reducción de CAC en 60%. Modelo revenue share alinea incentivos perfectamente. Base de datos escalable y auto-actualizable.',
      metrics: [
        { value: '42%', label: 'Conversión tier A', before: '12%', after: '42% (+350%)' },
        { value: '-60%', label: 'Reducción CAC', before: 'CAC alto', after: '-60% CAC' },
        { value: '+40K', label: 'Registros DB', before: '0', after: '+40K registros' }
      ],
      timeline: 'Continuo',
      service: 'Agente Vertical (IA)'
    },
    {
      client: 'Inmobiliaria Valdepeñas',
      sector: 'Real Estate',
      icon: Home,
      color: 'success',
      image: (
        <img
          src="/assets/logos/valdepenas-logo.png"
          alt="Sherwin Williams México"
          className="w-50 h-30 object-contain"
        />
      ),
      challenge: 'Transformación Comercial Inmobiliaria con Análisis de Mercado',
      description: 'Análisis de mercado integral con estrategias de precios dinámicos, análisis demográfico, campañas digitales masivas y optimización de mix de productos. Segmentación precisa de buyer personas y canales óptimos.',
      result: 'Aumento del 30% en visitas al desarrollo y 25% en ventas en 6 meses. Optimización de relación costo-beneficio en captación. Reducción del 18% en costos de marketing por conversión.',
      metrics: [
        { value: '+30%', label: 'Visitas desarrollo', before: 'Baseline', after: '+30%' },
        { value: '+25%', label: 'Ventas cerradas', before: 'Baseline', after: '+25%' },
        { value: '-18%', label: 'Costo/conversión', before: 'Alto CAC', after: '-18% optimizado' }
      ],
      timeline: '20 días',
      service: 'Análisis de Mercado'
    },
    {
      client: 'Todos Unidos Panamá',
      sector: 'Política Electoral',
      icon: Users,
      color: 'tech',
      image: '🗳️',
      challenge: 'Estrategias Digitales Disruptivas para Impacto Electoral',
      description: 'Segmentación avanzada de votantes jóvenes (18-35 años), pruebas A/B masivas de mensajes, estrategias multicanal (TikTok, Instagram, Twitter), análisis de sentiment real-time, y dashboards de performance electoral.',
      result: 'Incremento del 310% en interacciones digitales. Captura del +40% del segmento juvenil objetivo. Posicionamiento como líder entre votantes jóvenes. Modelo replicable para futuras campañas.',
      metrics: [
        { value: '+310%', label: 'Interacciones', before: 'Baseline', after: '+310%' },
        { value: '+40%', label: 'Segmento juvenil', before: '12%', after: '+40%' },
        { value: '#1', label: 'Ranking juventud', before: '#4', after: '#1' }
      ],
      timeline: '90 días',
      service: 'Estrategia Digital'
    }
  ]

  // Alianzas y Reconocimientos
  const alianzas = [
    {
      name: 'AMCI',
      fullName: 'Asociación Mexicana de Concreteros Independientes',
      description: 'Alianza estratégica para análisis de mercado del concreto en México. 4+ eventos nacionales.',
      icon: '🏗️',
      color: 'warning',
      badge: 'Aliado Estratégico',
      projects: [
        'Reporte Mercado del Concreto 2025',
        '4 Reuniones Nacionales (Tijuana, Hermosillo, Puebla, San Luis Potosí, Guadalajara)',
        'Conferencias con +3M data points'
      ]
    },
    {
      name: 'CANACINTRA',
      fullName: 'Cámara Nacional de la Industria de Transformación',
      description: 'Sponsor y ponencias en eventos industriales. Talleres de segmentación con IA.',
      icon: '🏭',
      color: 'tech',
      badge: 'Partner Industrial',
      projects: [
        'Momentum Expo (sponsor)',
        'Taller Segmentación Avanzada con DATA e IA',
        'Reunión Anual Jóvenes Industriales Pachuca'
      ]
    },
    {
      name: 'Momentum Expo',
      fullName: 'Expo Momentum - Hidalgo',
      description: 'Sponsor oficial y presentación de taller sobre segmentación avanzada con IA.',
      icon: '⚡',
      color: 'teseo',
      badge: 'Sponsor Oficial',
      projects: [
        'Taller: Segmentación Avanzada con DATA e IA',
        'Networking con industria regional',
        'Difusión de herramientas data-driven'
      ]
    }
  ]

  // Proceso de consultoría - ¿Cómo funciona?
  const procesoConsultoria = [
    {
      numero: '01',
      titulo: 'Contacto Inicial y Discovery',
      descripcion: 'Agenda una videollamada de 45-60 min donde entendemos tu desafío de negocio, objetivos estratégicos, KPIs clave y timeline. Revisamos datos disponibles y definimos hipótesis preliminares.',
      timing: '2-3 días',
      tips: [
        'Prepara contexto de negocio: industria, mercado objetivo, competitors',
        'Define objetivos cuantitativos claros (ej: proyección de demanda, ROI de expansión)',
        'Identifica fuentes de datos internas disponibles (CRM, transacciones, etc.)',
        'Establece timeline y urgencia del proyecto'
      ],
      icon: 'FileText',
      color: 'teseo'
    },
    {
      numero: '02',
      titulo: 'Propuesta Técnica y Metodología',
      descripcion: 'Generamos propuesta técnica detallada con alcance del proyecto, metodología (modelos econométricos, ML, simulaciones), entregables, stack tecnológico, timeline y términos comerciales. NDA incluido.',
      timing: '1-2 días',
      tips: [
        'Revisamos metodología propuesta: modelos econométricos, ML, simulaciones',
        'Validamos entregables: reportes, dashboards, modelos, código fuente',
        'Ajustamos timeline según prioridades de negocio',
        'Aclaramos dudas sobre stack tecnológico (Python, R, SQL, APIs)'
      ],
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      numero: '03',
      titulo: 'Recopilación y Consolidación de Datos',
      descripcion: 'Integramos 50+ fuentes públicas (INEGI, DENUE, Banxico, Bloomberg, BBVA Research, asociaciones industriales) y bases propietarias exclusivas. Limpieza, validación y consolidación en data warehouse. ETL automatizado con Python/SQL.',
      timing: '4-6 días',
      tips: [
        'Fuentes públicas: INEGI, DENUE, Banxico, Bloomberg, World Bank',
        'Bases propietarias: 3M+ registros de mercados, competencia, demanda',
        'ETL automatizado con Python (pandas, SQLAlchemy)',
        'Validación cruzada de fuentes múltiples para consistencia'
      ],
      icon: 'Database',
      color: 'tech'
    },
    {
      numero: '04',
      titulo: 'Data Engineering y Feature Engineering',
      descripcion: 'Procesamiento avanzado de datos con Python (pandas, numpy, scikit-learn). Feature engineering con variables derivadas, transformaciones matemáticas, encodings y agregaciones. Análisis exploratorio (EDA) con visualizaciones avanzadas.',
      timing: '3-5 días',
      tips: [
        'Feature engineering: creación de +50 variables derivadas',
        'Transformaciones: log, raíz, diferencias, ratios, moving averages',
        'Encoding de categóricas: one-hot, label, target, ordinal',
        'EDA exhaustivo: distribuciones, correlaciones, outliers, missing values'
      ],
      icon: 'Brain',
      color: 'warning'
    },
    {
      numero: '05',
      titulo: 'Modelado Econométrico y Machine Learning',
      descripcion: 'Aplicamos modelos econométricos avanzados (cointegración de Johansen, VAR, ARIMA, regresión hedónica) y ML (Random Forest, XGBoost, LightGBM, redes neuronales). Simulaciones Monte Carlo (10K+ iteraciones) para intervalos de confianza. Optimización de hiperparámetros con GridSearchCV/Optuna.',
      timing: '6-10 días',
      tips: [
        'Econometría: cointegración, VAR, VECM, ARIMA, regresión hedónica',
        'ML supervisado: Random Forest, XGBoost, LightGBM, CatBoost',
        'Deep Learning: redes neuronales (TensorFlow/PyTorch) para patrones complejos',
        'Simulaciones Monte Carlo: 10K iteraciones para intervalos de confianza 95%'
      ],
      icon: 'TrendingUp',
      color: 'teseo'
    },
    {
      numero: '06',
      titulo: 'Validación Rigurosa y Backtesting',
      descripcion: 'Validación cruzada k-fold (k=5), backtesting con datos históricos, análisis de residuos, pruebas de robustez (bootstrap, jackknife) y métricas de error (R², RMSE, MAE, MAPE). Garantizamos R² > 0.85 y RMSE < 5% en proyecciones.',
      timing: '3-4 días',
      tips: [
        'Validación cruzada k-fold (k=5) para evitar overfitting',
        'Backtesting con datos históricos: comparamos predicciones vs real',
        'Métricas: R² > 0.85, RMSE < 5%, MAE, MAPE, intervalos de confianza',
        'Pruebas de robustez: bootstrap (1000 muestras), análisis de residuos'
      ],
      icon: 'Shield',
      color: 'success'
    },
    {
      numero: '07',
      titulo: 'Análisis de Sensibilidad y Escenarios',
      descripcion: 'Análisis de sensibilidad multi-variable (tornado charts, spider plots) para identificar drivers clave. Construcción de escenarios múltiples (conservador 20%, base 60%, optimista 20%) con asignación de probabilidades. Simulación de stress tests.',
      timing: '2-3 días',
      tips: [
        'Análisis de sensibilidad: tornado charts, spider plots, one-at-a-time',
        'Escenarios probabilísticos: conservador (20%), base (60%), optimista (20%)',
        'Identificación de variables críticas con mayor impacto',
        'Stress testing: qué pasa si variables clave cambian ±20-30%'
      ],
      icon: 'LineChart',
      color: 'warning'
    },
    {
      numero: '08',
      titulo: 'Entrega de Reporte y Dashboard Interactivo',
      descripcion: 'Reporte PDF Ejecutivo (80-150 páginas) con análisis completo, metodología, resultados, visualizaciones y recomendaciones estratégicas. Dashboard interactivo (Excel/PowerBI/Tableau) con simulador de escenarios. Presentación PPT Ejecutiva (40-50 slides). Sesión Q&A de 2h con tu equipo directivo. Código fuente documentado (Python/R) incluido.',
      timing: '2-3 días',
      tips: [
        'Reporte PDF: 80-150 págs con análisis completo y metodología transparente',
        'Dashboard interactivo: Excel/PowerBI con simulador de escenarios editables',
        'Presentación PPT: 40-50 slides ejecutivos para stakeholders',
        'Código fuente Python/R documentado con notebooks reproducibles'
      ],
      icon: 'Award',
      color: 'teseo'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 industrial-grid">

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden industrial-grid">
        {/* Red de Nodos Animada */}
        <DataNetworkBackground />

        {/* Gradient overlays para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-industrial-900/50 to-industrial-900 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-900/80 via-transparent to-industrial-900/80 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="glow-text">Teseo</span>
                <span className="text-white"> Data Lab</span>
              </h1>
              <p className="text-xl md:text-2xl text-industrial-300 font-light mb-2">
                S.A.S. de C.V.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-industrial-400">
                <span className="px-3 py-1 bg-teseo-500/10 border border-teseo-500/30 rounded-full">
                  Inteligencia de Negocios
                </span>
                <span className="px-3 py-1 bg-tech-500/10 border border-tech-500/30 rounded-full">
                  Análisis Econométrico
                </span>
                <span className="px-3 py-1 bg-success-500/10 border border-success-500/30 rounded-full">
                  Big Data
                </span>
              </div>
            </motion.div>

            {/* Tagline Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-2xl md:text-4xl text-white font-bold mb-4">
                Deja que otros tengan opiniones,
              </p>
              <p className="text-3xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">tú ten data</span>
              </p>
              <p className="text-lg md:text-xl text-industrial-300 max-w-4xl mx-auto leading-relaxed">
                Transformamos datos en <span className="text-teseo-400 font-semibold">decisiones estratégicas</span> para empresas en expansión, inversión inmobiliaria y optimización comercial.
                <span className="text-white font-semibold"> +18 años</span> ayudando a empresas mexicanas a crecer con inteligencia de datos.
              </p>
            </motion.div>

            {/* Value Propositions - Nuevo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto"
            >
              <div className="card-glass p-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teseo-500/20 rounded-lg">
                    <Target className="w-6 h-6 text-teseo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Análisis Predictivo</h3>
                    <p className="text-sm text-industrial-300">Modelos econométricos para decisiones de expansión e inversión</p>
                  </div>
                </div>
              </div>
              <div className="card-glass p-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-tech-500/20 rounded-lg">
                    <Brain className="w-6 h-6 text-tech-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">IA Comercial</h3>
                    <p className="text-sm text-industrial-300">Automatización y prospección inteligente con ROI comprobado</p>
                  </div>
                </div>
              </div>
              <div className="card-glass p-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-success-500/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-success-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Dashboards en Tiempo Real</h3>
                    <p className="text-sm text-industrial-300">Visualización de métricas clave para decisiones ágiles</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {heroStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="card-glass p-6"
                  >
                    <Icon className="w-8 h-8 text-teseo-400 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-industrial-300">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                onClick={() => window.open('https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada', '_blank')}
                className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Agendar consulta gratuita</span>
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                onClick={() => window.open('https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada', '_blank')}
                className="btn-secondary px-8 py-4 text-lg inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver más detalles</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-teseo-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-teseo-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Introducción - Quiénes Somos */}
      <section id="nosotros" className="py-32 px-4 bg-gradient-to-br from-tech-500/5 via-teseo-500/5 to-warning-500/5 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-500/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Quiénes <span className="glow-text">Somos</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Equipo global de científicos de datos que transforma información compleja en decisiones estratégicas
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass-strong p-8 md:p-12 mb-12"
          >
            <p className="text-lg md:text-xl text-industrial-200 leading-relaxed mb-6">
              Somos un <span className="text-white font-semibold">equipo global de científicos de datos, econometristas y desarrolladores de software</span> que utiliza la <span className="text-teseo-400 font-semibold">Inteligencia Artificial</span> y modelos <span className="text-teseo-400 font-semibold">econométricos avanzados</span> para analizar, detectar patrones ocultos, prospectar oportunidades y generar soluciones de impacto medible para instituciones, empresas y gobiernos.
            </p>
            <p className="text-lg md:text-xl text-industrial-200 leading-relaxed">
              Ayudamos a nuestros clientes a lograr un <span className="text-white font-semibold">desarrollo escalable, modular, eficiente e iterativo</span> mediante metodologías rigurosas que combinan Machine Learning, simulaciones Monte Carlo y análisis de series temporales con validación estadística exhaustiva.
            </p>
          </motion.div>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-glass p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teseo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-teseo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Experiencia Global</h3>
                  <p className="text-industrial-300">
                    <span className="text-warning-400 font-semibold text-lg">+18 años</span> de trayectoria transformando datos en estrategias ganadoras
                  </p>
                </div>
              </div>
              <div className="pl-16">
                <div className="flex flex-wrap gap-2 mt-4">
                  {['🇲🇽 México', '🇯🇵 Japón', '🇺🇸 Estados Unidos', '🇨🇦 Canadá', '🇨🇭 Suiza', '🇩🇪 Alemania'].map((country, i) => (
                    <span key={i} className="px-3 py-1 bg-industrial-700/50 border border-industrial-600 rounded-full text-sm text-industrial-300">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Industries Served */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-glass p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-tech-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-tech-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sectores de Impacto</h3>
                  <p className="text-industrial-300">
                    Soluciones especializadas para industrias estratégicas
                  </p>
                </div>
              </div>
              <div className="pl-16">
                <ul className="space-y-3 mt-4">
                  {[
                    { sector: 'Bienes Raíces', icon: '🏗️', example: 'Desarrollo inmobiliario' },
                    { sector: 'Manufactura', icon: '🏭', example: 'Nearshoring & expansión' },
                    { sector: 'Construcción', icon: '🧱', example: 'Mercado de concreto' },
                    { sector: 'Retail', icon: '🛍️', example: 'Prospección comercial' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-industrial-200">
                      <span className="text-2xl">{item.icon}</span>
                      <span><span className="font-semibold text-white">{item.sector}</span> · {item.example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Track Record */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            
          </motion.div>
        </div>
      </section>

      {/* Sectores donde dejamos Huella */}
      <section className="py-32 px-4 bg-gradient-to-br from-warning-500/5 via-teseo-500/5 to-tech-500/5 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-tech-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sectores donde dejamos <span className="glow-text">Huella</span>
            </h2>
            
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Confianza de empresas líderes en México, Panamá y Estados Unidos
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teseo-500/10 to-success-500/10 border border-teseo-500/20 rounded-full">
              <Trophy className="w-5 h-5 text-teseo-400" />
              <span className="text-white font-semibold">
                Nos enorgullece haber brindado <span className="text-teseo-400">soluciones innovadoras y efectivas</span> a nuestros clientes en la industria de análisis de datos
              </span>
            </div>
          </motion.div>

          {/* Logos Grid - 4x4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  // Manufactura / Industrial
                  { name: 'Sherwin Williams', sector: 'Manufactura', color: 'warning', logo: 'public/assets/logos/sherwin-williams-logo.png', url: 'https://sherwin.com.mx/' },
                  { name: 'AMCI', sector: 'Consultoría Industrial', color: 'warning', logo: 'public/assets/logos/amci-logo.png', url: 'https://amciac.org/' },
                  { name: 'AP Safety', sector: 'Seguridad Industrial', color: 'warning', logo: 'public/assets/logos/ap-safety-logo.png', url: 'https://www.apmascarillas.com.mx/afety.com' },
                  // Real Estate
                  { name: 'DatAlpine', sector: 'Real Estate', color: 'teseo', logo: 'public/assets/logos/datalpine-logo.png', url: 'https://datalpine.mx/' },
                  { name: 'Le Curve', sector: 'Bienes Raíces', color: 'teseo', logo: 'public/assets/logos/le-curve-logo.png', url: 'https://lecurve.mx/' },
                  { name: 'AMPI', sector: 'Asociación Inmobiliaria', color: 'teseo', logo: 'public/assets/logos/ampi-logo.png', url: 'https://ampirivieranayarit.com/' },
                  // Energía / Tecnología
                  { name: 'Gas de Provincia', sector: 'Energía', color: 'warning', logo: 'public/assets/logos/gas-de-provincia-logo.png', url: 'https://www.gasdeprovincia.com.mx/' },
                  { name: 'monitorLATINO', sector: 'Tecnología', color: 'tech', logo: 'public/assets/logos/monitor-latino.png', url: 'https://monitorlatino.com/' },
                  // Legal & Consulting
                  { name: 'Franklin Arosemena Torrijos', sector: 'Legal y consultoria', color: 'tech', logo: 'public/assets/logos/franklin-arosemena-torrijos-logo.png', url: '' },
                  // Construcción
                  { name: 'Pumping Team', sector: 'Construcción', color: 'success', logo: 'public/assets/logos/pumping-team-logo.png', url: 'https://www.pumpingteam.com/' },
                  { name: 'TEYSA', sector: 'Maquinados', color: 'success', logo: 'public/assets/logos/teysa-logo.png', url: 'https://mteysa.com/' },
                  { name: 'Stratto', sector: 'Construcción', color: 'success', logo: 'public/assets/logos/stratto-logo.png', url: '' },
                  // Real Estate (continued)
                  { name: 'HOMIA', sector: 'Bíenes Raíces', color: 'teseo', logo: 'public/assets/logos/homia-logo.png', url: 'https://homia.mx/es' },
                  { name: 'Cayco', sector: 'Construcción', color: 'teseo', logo: 'public/assets/logos/cayco-logo.png', url: 'https://www.cayco.mx/' },
                  { name: 'Valdepeñas', sector: 'Bienes Raíces', color: 'teseo', logo: 'public/assets/logos/valdepenas-logo.png', url: 'https://valdepenasinmobiliaria.com.mx/' },
                  // F&B
                  { name: 'Villanova', sector: 'F&B', color: 'tech', logo: 'public/assets/logos/villanova-logo.png', url: 'https://villanova.com.mx/v1/' },
                ].map((client, index) => (
                  <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => window.open(client.url, '_blank')}
                  className="card-glass p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative overflow-hidden"
                  >
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${client.color}-500/0 to-${client.color}-500/0 group-hover:from-${client.color}-500/10 group-hover:to-${client.color}-500/10 transition-all duration-300`} />

                  {/* Logo container - Ready for logo images */}
                  <div className={`relative z-10 w-20 h-20 rounded-xl bg-gradient-to-br from-industrial-800/80 to-industrial-900/80 border border-industrial-700/50 flex items-center justify-center mb-4 group-hover:border-${client.color}-500/30 transition-all duration-300 overflow-hidden`}>
                    {/* Fallback placeholder - Always rendered, hidden when image loads */}
                    <div
                    className={`absolute inset-0 bg-gradient-to-br from-${client.color}-500/20 to-${client.color}-500/30 flex items-center justify-center`}
                    id={`fallback-${index}`}
                    >
                    <span className="text-2xl font-bold text-white">
                      {client.name.charAt(0)}
                    </span>
                    </div>
                    {/* Logo image - Add actual logo files to /public/logos/ folder */}
                    <img
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    className="w-14 h-14 object-contain opacity-90 group-hover:opacity-100 transition-opacity relative z-10 cursor-pointer"
                    onLoad={(e) => {
                      // Hide fallback when image loads successfully
                      const fallback = document.getElementById(`fallback-${index}`);
                      if (fallback) fallback.style.display = 'none';
                    }}
                    onError={(e) => {
                      // Hide broken image, keep fallback visible
                      e.target.style.display = 'none';
                    }}
                    />
                  </div>

                  {/* Client name */}
                  <h3 className="relative z-10 text-base font-semibold text-white mb-1 line-clamp-2">
                    {client.name}
                  </h3>

                  {/* Sector tag */}
                  <span className={`relative z-10 text-xs text-industrial-400 group-hover:text-${client.color}-400 transition-colors`}>
                    {client.sector}
                  </span>
                  </motion.div>
                ))}
                </div>

                {/* Track record footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teseo-500/10 to-tech-500/10 rounded-full border border-teseo-500/20">
              <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
              <span className="text-lg text-white font-medium">
                <span className="text-teseo-400 font-bold">+18 años</span> entregando resultados en{' '}
                <span className="text-tech-400 font-bold">6 países</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cobertura Nacional - Mapa Interactivo */}
      <section className="py-32 px-4 bg-gradient-to-br from-teseo-950 via-industrial-900 to-tech-950 relative overflow-hidden">
        {/* Background effects - Actualizado */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-success-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Map className="w-16 h-16 text-success-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cobertura <span className="glow-text">Nacional</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto mb-8">
              Operamos en todo México con proyectos en múltiples estados y sectores
            </p>

            {/* Badge Nacional */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-success-500/20 to-tech-500/20 rounded-full border border-success-500/30">
              <Globe className="w-5 h-5 text-success-400" />
              <span className="text-lg text-white font-semibold">
                Presencia Nacional • +15 Estados
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mapa de México Interactivo - Nuevo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-strong p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Map className="w-7 h-7 text-teseo-400" />
                Mapa de Cobertura Nacional
              </h3>

              {/* Componente de Mapa SVG */}
              <div className="mb-6 bg-gradient-to-br from-industrial-950 to-industrial-900 rounded-xl p-6 border border-teseo-500/20">
                <MexicoMap />
              </div>

              {/* Total Counter */}
              <div className="p-4 bg-gradient-to-r from-teseo-500/10 to-success-500/10 rounded-xl border border-teseo-500/20 text-center">
                <div className="text-4xl font-bold glow-text mb-1">+130</div>
                <div className="text-sm text-industrial-400">Proyectos Completados en 12 Estados</div>
              </div>
            </motion.div>

            {/* Regiones Clave */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  region: 'Centro (Bajío)',
                  estados: 'Querétaro, Guanajuato, Aguascalientes',
                  proyectos: 42,
                  icon: Factory,
                  color: 'warning',
                  destacado: 'Hub industrial y manufactura'
                },
                {
                  region: 'Zona Metropolitana',
                  estados: 'CDMX, Estado de México, Hidalgo',
                  proyectos: 52,
                  icon: Building2,
                  color: 'teseo',
                  destacado: 'Real estate y servicios'
                },
                {
                  region: 'Norte',
                  estados: 'Nuevo León, San Luis Potosí',
                  proyectos: 21,
                  icon: TrendingUp,
                  color: 'tech',
                  destacado: 'Expansión empresarial'
                },
                {
                  region: 'Occidente',
                  estados: 'Jalisco, Michoacán',
                  proyectos: 15,
                  icon: Globe,
                  color: 'success',
                  destacado: 'Comercio y logística'
                }
              ].map((region, index) => {
                const Icon = region.icon
                return (
                  <motion.div
                    key={region.region}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-glass-strong p-6 hover:border-teseo-500/40 transition-all group cursor-pointer bg-gradient-to-br from-industrial-900/80 to-industrial-950/80"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-teseo-500/20 group-hover:bg-teseo-500/30 transition-all">
                        <Icon className="w-6 h-6 text-teseo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white">{region.region}</h4>
                          <span className="text-2xl font-bold text-teseo-400">
                            {region.proyectos}
                          </span>
                        </div>
                        <p className="text-sm text-industrial-400 mb-2">{region.estados}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-500/10 rounded-full border border-success-500/20">
                          <span className="text-xs text-industrial-300">{region.destacado}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-lg text-industrial-300 mb-6">
              ¿Tu proyecto está en otra región? También operamos en todo el país.
            </p>
            <motion.button
              onClick={() => window.open('https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada', '_blank')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-success-500 to-tech-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-success-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5" />
              <span>Consultar Cobertura de tu Proyecto</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Nosotros - Filosofía Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-teseo-500/10 to-tech-500/5 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Decisiones más <span className="glow-text">inteligentes</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              {filosofia.subtitle}
            </p>
          </motion.div>

          {/* Propósito y Visión Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-strong p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teseo-500/10 rounded-full blur-2xl -z-10 group-hover:bg-teseo-500/20 transition-colors" />
              <h3 className="text-2xl font-bold text-teseo-400 mb-4">{filosofia.proposito.title}</h3>
              <p className="text-lg text-industrial-300 leading-relaxed">
                {filosofia.proposito.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-strong p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-tech-500/10 rounded-full blur-2xl -z-10 group-hover:bg-tech-500/20 transition-colors" />
              <h3 className="text-2xl font-bold text-tech-400 mb-4">{filosofia.vision.title}</h3>
              <p className="text-lg text-industrial-300 leading-relaxed">
                {filosofia.vision.description}
              </p>
            </motion.div>
          </div>

          {/* Valores Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-8">Nuestros Valores</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filosofia.valores.map((valor, index) => {
              const IconComponent = valor.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-glass p-6 text-center group"
                >
                  <div className={`w-16 h-16 rounded-xl bg-${valor.color}-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-${valor.color}-500/30 transition-colors`}>
                    <IconComponent className={`text-${valor.color}-400`} size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{valor.title}</h4>
                  <p className="text-sm text-industrial-300 leading-relaxed">
                    {valor.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestros Servicios de <span className="glow-text">Inteligencia de Datos</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Análisis econométricos profesionales para maximizar el ROI de tu negocio
            </p>
          </motion.div>

          {/* Selector de Servicios */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {services.map((servicio, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedService(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedService === index
                    ? `bg-${servicio.color}-500 text-white shadow-lg`
                    : 'bg-industrial-800 text-industrial-300 hover:bg-industrial-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {servicio.nombre}
              </motion.button>
            ))}
          </div>

          {/* Servicio Seleccionado */}
          <motion.div
            key={selectedService}
            className="card-glass p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Info */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  {React.createElement(services[selectedService].icon, {
                    className: `text-${services[selectedService].color}-400`,
                    size: 48
                  })}
                  <div>
                    {services[selectedService].badge && (
                      <span className={`inline-block px-3 py-1 bg-${services[selectedService].color}-500/20 border border-${services[selectedService].color}-500/50 rounded-full text-${services[selectedService].color}-400 text-xs font-semibold mb-3`}>
                        {services[selectedService].badge}
                      </span>
                    )}
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {services[selectedService].nombre}
                    </h3>
                    <p className={`text-${services[selectedService].color}-400 font-semibold mb-4`}>
                      {services[selectedService].tagline}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-industrial-300 mb-6">
                  {services[selectedService].descripcion}
                </p>

                <div className="space-y-3 mb-8">
                  {services[selectedService].caracteristicas.map((caracteristica, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className={`text-${services[selectedService].color}-400 flex-shrink-0 mt-0.5`} size={18} />
                      <span className="text-sm text-industrial-300">{caracteristica}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-4 bg-industrial-800/50 rounded-lg mb-6">
                  <span className="text-industrial-400 text-sm">Inversión</span>
                  <span className="text-2xl font-bold glow-text">{services[selectedService].pricing}</span>
                </div>

                <div className="space-y-3">
                  <Link to={services[selectedService].link}>
                    <motion.div
                      className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={20} />
                      <span>Más Información</span>
                      <ArrowRight size={20} />
                    </motion.div>
                  </Link>
                  <a
                    onClick={() => window.open('https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada', '_blank')}
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <span>Agendar consulta gratuita</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Métricas */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-4">Métricas Clave</h4>
                {services[selectedService].metricas.map((metrica, i) => (
                  <div key={i} className="card-glass p-6">
                    <div className="text-xs text-industrial-400 mb-2">{metrica.label}</div>
                    <div className={`text-4xl font-bold text-${services[selectedService].color}-400 mb-1`}>
                      {metrica.value}
                    </div>
                    <div className="text-sm text-industrial-400">{metrica.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Casos de Éxito Verificados - AMPLIADO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-industrial-950 to-industrial-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Trophy className="w-16 h-16 text-teseo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Casos de Éxito <span className="glow-text">Verificados</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Proyectos reales con métricas comprobadas que transformaron estrategias comerciales
            </p>
          </motion.div>

          <div className="space-y-8">
            {successStories.map((story, index) => {
              const IconComponent = story.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-glass-strong p-8 md:p-12 relative overflow-hidden group"
                >
                  {/* Background gradient effect */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-${story.color}-500/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    {/* Left side - Icon + Client info */}
                    <div className="md:col-span-3 text-center md:text-left">
                      {/* Icon grande */}
                      <div className="text-8xl mb-4 inline-block">
                        {story.image}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {story.client}
                      </h3>

                      <div className={`inline-block px-3 py-1 bg-${story.color}-500/20 border border-${story.color}-500/50 rounded-lg`}>
                        <span className={`text-${story.color}-400 font-semibold text-sm`}>
                          {story.sector}
                        </span>
                      </div>
                    </div>

                    {/* Middle - Description */}
                    <div className="md:col-span-6 space-y-4">
                      <div>
                        <h4 className={`text-lg font-bold text-${story.color}-400 mb-2`}>
                          Desafío
                        </h4>
                        <p className="text-industrial-300 leading-relaxed">
                          {story.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-tech-400 mb-2">
                          Solución Implementada
                        </h4>
                        <p className="text-industrial-300 leading-relaxed">
                          {story.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-success-400 mb-2">
                          Resultado Comprobado
                        </h4>
                        <p className="text-white font-semibold leading-relaxed">
                          {story.result}
                        </p>
                      </div>
                    </div>

                    {/* Right side - Metrics con Antes/Después */}
                    <div className="md:col-span-3 space-y-3">
                      {story.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className={`bg-${story.color}-500/10 border border-${story.color}-500/30 rounded-lg p-4`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-industrial-500 uppercase">Antes</div>
                            <div className="text-xs text-industrial-500">→</div>
                            <div className="text-xs text-industrial-500 uppercase">Después</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-industrial-400">{metric.before}</span>
                            <div className={`text-3xl font-bold text-${story.color}-400`}>
                              {metric.value}
                            </div>
                          </div>
                          <div className="text-sm text-white font-semibold text-center mt-2">
                            {metric.label}
                          </div>
                        </motion.div>
                      ))}

                      {/* Timeline y Servicio */}
                      <div className="pt-3 border-t border-industrial-700">
                        <div className="flex items-center justify-between text-xs text-industrial-400">
                          <span>⏱️ {story.timeline}</span>
                          <span className={`px-2 py-1 bg-${story.color}-500/20 rounded text-${story.color}-400 font-semibold`}>
                            {story.service}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Footer con métricas consolidadas */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Impacto <span className="glow-text">Consolidado</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div>
                  <div className="text-4xl font-bold text-warning-400 mb-2">397%</div>
                  <div className="text-sm text-industrial-400">ROI Máximo Alcanzado</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teseo-400 mb-2">+$15M</div>
                  <div className="text-sm text-industrial-400">Pérdidas Evitadas</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-tech-400 mb-2">-60%</div>
                  <div className="text-sm text-industrial-400">Reducción CAC</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-success-400 mb-2">+42%</div>
                  <div className="text-sm text-industrial-400">Conversión Tier A</div>
                </div>
                <div>
                  <div className="text-4xl font-bold glow-text mb-2">5</div>
                  <div className="text-sm text-industrial-400">Sectores Transformados</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculadora ROI - Estilo DatAlpine */}
      <section id="casos" className="py-24 px-4 bg-gradient-to-br from-teseo-500/5 via-tech-500/5 to-success-500/5 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teseo-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-500/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Calculator className="w-16 h-16 text-teseo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Calcula tu <span className="glow-text">Retorno de Inversión</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Selecciona los servicios que necesitas y descubre el impacto real en tu negocio basado en casos verificados
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel de Configuración */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-strong p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                1. Tu Proyecto
              </h3>

              {/* Slider de Inversión */}
              <div className="mb-8">
                <label className="block text-industrial-300 mb-3">
                  Inversión Total del Proyecto
                </label>
                <div className="mb-4">
                  <input
                    type="range"
                    min="1000000"
                    max="200000000"
                    step="1000000"
                    value={inversionTotal}
                    onChange={(e) => setInversionTotal(parseInt(e.target.value))}
                    className="w-full h-2 bg-industrial-700 rounded-lg appearance-none cursor-pointer accent-teseo-500"
                  />
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold glow-text">
                    ${(inversionTotal / 1000000).toFixed(1)}M MXN
                  </span>
                </div>
              </div>

              <div className="h-px bg-industrial-700 my-8" />

              {/* Selector de Servicios */}
              <h3 className="text-2xl font-bold text-white mb-6">
                2. Selecciona los Servicios
              </h3>

              <div className="space-y-4">
                {/* Análisis de Expansión */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-teseo-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.expansion}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      expansion: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-teseo-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">Análisis Data-Econométrico de Expansión</h4>
                      <span className="text-sm px-2 py-1 bg-warning-500/20 text-warning-400 rounded">Consultoría</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.expansion.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.expansion.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.expansion.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>

                {/* Análisis de Inversión */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-teseo-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.inversion}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      inversion: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-teseo-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">Análisis de Inversión</h4>
                      <span className="text-sm px-2 py-1 bg-warning-500/20 text-warning-400 rounded">Consultoría</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.inversion.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.inversion.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.inversion.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>

                {/* Agente Vertical */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-tech-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.agenteVertical}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      agenteVertical: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-tech-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">Agente Vertical (IA)</h4>
                      <span className="text-sm px-2 py-1 bg-tech-500/20 text-tech-400 rounded">SaaS Anual</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.agenteVertical.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.agenteVertical.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.agenteVertical.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>

                {/* AI CRM Lead Journey */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-tech-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.leadJourney}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      leadJourney: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-tech-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">AI CRM Lead Journey</h4>
                      <span className="text-sm px-2 py-1 bg-tech-500/20 text-tech-400 rounded">SaaS Anual</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.leadJourney.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.leadJourney.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.leadJourney.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>

                {/* Análisis de Mercado Industrial */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-warning-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.mercadoIndustrial}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      mercadoIndustrial: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-warning-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">Análisis de Mercado Industrial</h4>
                      <span className="text-sm px-2 py-1 bg-warning-500/20 text-warning-400 rounded">Consultoría</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.mercadoIndustrial.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.mercadoIndustrial.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.mercadoIndustrial.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>

                {/* Automatización Comercial */}
                <label className="flex items-start gap-4 p-4 rounded-lg bg-industrial-800/50 hover:bg-industrial-800 transition-all cursor-pointer border border-transparent hover:border-success-500/30">
                  <input
                    type="checkbox"
                    checked={serviciosSeleccionados.automatizacion}
                    onChange={(e) => setServiciosSeleccionados({
                      ...serviciosSeleccionados,
                      automatizacion: e.target.checked
                    })}
                    className="mt-1 w-5 h-5 accent-success-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">Automatización Comercial</h4>
                      <span className="text-sm px-2 py-1 bg-success-500/20 text-success-400 rounded">Consultoría</span>
                    </div>
                    <p className="text-sm text-industrial-400 mb-2">{serviciosROI.automatizacion.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-industrial-500">ROI: {serviciosROI.automatizacion.roi}%</span>
                      <span className="font-semibold glow-text">${(serviciosROI.automatizacion.costo / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </label>
              </div>
            </motion.div>

            {/* Panel de Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Métricas Principales */}
              <div className="card-glass-strong p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  3. Tu Retorno Estimado
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-industrial-800/50 rounded-lg">
                    <div className="text-xs text-industrial-500 mb-1">ROI Total</div>
                    <div className="text-3xl font-bold glow-text">{impacto.roiTotal}%</div>
                  </div>
                  <div className="text-center p-4 bg-industrial-800/50 rounded-lg">
                    <div className="text-xs text-industrial-500 mb-1">Inversión</div>
                    <div className="text-3xl font-bold text-warning-400">${(impacto.costoTotal / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="text-center p-4 bg-industrial-800/50 rounded-lg">
                    <div className="text-xs text-industrial-500 mb-1">Ganancia</div>
                    <div className="text-3xl font-bold text-success-400">${(impacto.gananciaTotal / 1000).toFixed(0)}K</div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-success-500/20 to-tech-500/20 border border-success-500/30 rounded-xl">
                  <div className="text-sm text-industrial-300 mb-2">Beneficio Neto Anual</div>
                  <div className="text-5xl font-bold text-white">
                    ${(impacto.beneficioNeto / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-success-400 mt-2">
                    Basado en casos reales verificados
                  </div>
                </div>
              </div>

              {/* Gráfica de Barras - Análisis Financiero */}
              {impacto.costoTotal > 0 && (
                <div className="card-glass-strong p-8">
                  <h4 className="text-lg font-bold text-white mb-4">Análisis Financiero</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[{
                      name: 'Análisis',
                      inversion: inversionTotal / 1000000,
                      costo: impacto.costoTotal / 1000000,
                      ganancia: impacto.gananciaTotal / 1000000
                    }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                      />
                      <YAxis
                        stroke="#94a3b8"
                        label={{ value: 'Millones MXN', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value) => `$${value.toFixed(1)}M`}
                      />
                      <Legend />
                      <Bar
                        dataKey="inversion"
                        fill="#f59e0b"
                        name="Inversión"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="costo"
                        fill="#ef4444"
                        name="Costo Anual"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="ganancia"
                        fill="#10b981"
                        name="Ganancia Proyectada"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Gráfica de Proyección */}
              {impacto.costoTotal > 0 && (
                <div className="card-glass-strong p-8">
                  <h4 className="text-lg font-bold text-white mb-4">Proyección a 24 Meses</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsLineChart data={proyeccionGanancia}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis
                        dataKey="mes"
                        stroke="#94a3b8"
                        label={{ value: 'Meses', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        label={{ value: 'Millones MXN', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value) => `$${value.toFixed(2)}M`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ganancia"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="Ganancia Acumulada"
                        dot={{ fill: '#10b981', r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="neto"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Beneficio Neto"
                        dot={{ fill: '#3b82f6', r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Desglose por Servicio */}
              {impacto.desglose.length > 0 && (
                <div className="card-glass-strong p-8">
                  <h4 className="text-lg font-bold text-white mb-4">Desglose por Servicio</h4>
                  <div className="space-y-3">
                    {impacto.desglose.map((item, index) => (
                      <div key={index} className="p-4 bg-industrial-800/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-white text-sm">{item.nombre}</h5>
                          <span className="text-xs px-2 py-1 bg-teseo-500/20 text-teseo-400 rounded">
                            {item.tipo}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-industrial-500">Inversión</div>
                            <div className="font-semibold text-warning-400">${(item.costo / 1000).toFixed(0)}K</div>
                          </div>
                          <div>
                            <div className="text-industrial-500">ROI</div>
                            <div className="font-semibold text-tech-400">{item.roi}%</div>
                          </div>
                          <div>
                            <div className="text-industrial-500">Ganancia</div>
                            <div className="font-semibold text-success-400">${(item.ganancia / 1000).toFixed(0)}K</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {impacto.costoTotal > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="card-glass-strong p-6 text-center cursor-pointer border-2 border-success-500/30 hover:border-success-500/50 transition-all"
                  onClick={() => window.open('https://calendly.com/teseodata/consulta-gratuita', '_blank')}
                >
                  <p className="text-lg text-white mb-2">
                    ¿Quieres lograr estos resultados?
                  </p>
                  <p className="text-sm text-industrial-400 mb-4">
                    Agenda una consulta gratuita de 30 minutos con nuestros expertos
                  </p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-success-500 to-tech-500 text-white font-semibold rounded-lg">
                    <Calendar className="w-5 h-5" />
                    Agendar Consulta Gratuita
                  </span>
                </motion.div>
              )}

              {/* Mensaje cuando no hay servicios seleccionados */}
              {impacto.costoTotal === 0 && (
                <div className="card-glass-strong p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-industrial-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    Selecciona al menos un servicio
                  </h4>
                  <p className="text-industrial-400">
                    Elige los servicios que necesitas para calcular tu retorno de inversión estimado basado en casos reales
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-industrial-500 max-w-3xl mx-auto">
              * Los cálculos de ROI están basados en casos reales verificados de clientes anteriores.
              Los resultados pueden variar según el contexto específico de cada proyecto, industria y región.
              Las cifras presentadas representan promedios de proyectos exitosos completados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Star className="w-16 h-16 text-teseo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lo que dicen <span className="glow-text">nuestros clientes</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Testimonios reales de proyectos que transformaron decisiones de negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass-strong p-8 relative"
              >
                {/* Quote icon */}
                <Quote className={`absolute top-6 right-6 w-12 h-12 text-${testimonial.color}-500/20`} />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 text-${testimonial.color}-400 fill-current`} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-industrial-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Metric badge */}
                <div className={`inline-block px-4 py-2 bg-${testimonial.color}-500/20 border border-${testimonial.color}-500/50 rounded-lg mb-6`}>
                  <span className={`text-${testimonial.color}-400 font-bold text-lg`}>
                    {testimonial.metric}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-sm text-industrial-400">{testimonial.position}</p>
                    <p className={`text-sm text-${testimonial.color}-400 font-semibold`}>{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-wrap gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-teseo-400 fill-current" />
                <span className="text-white font-bold text-xl">5.0</span>
                <span className="text-industrial-400">/ 5.0</span>
              </div>
              <div className="h-8 w-px bg-industrial-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">130+</div>
                <div className="text-sm text-industrial-400">Proyectos Completados</div>
              </div>
              <div className="h-8 w-px bg-industrial-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">18+</div>
                <div className="text-sm text-industrial-400">Años de Experiencia</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿Cómo funciona? Section */}
      <section className="py-20 px-4" id="como-funciona">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¿Cómo <span className="glow-text">funciona?</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              El proceso de consultoría de Teseo Data Lab en 8 pasos. Del discovery a la entrega en 25-35 días hábiles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procesoConsultoria.map((paso, index) => {
              // Map icon string to actual component
              const iconMap = {
                'FileText': FileText,
                'CheckCircle': CheckCircle,
                'Database': Database,
                'Brain': Brain,
                'TrendingUp': TrendingUp,
                'Shield': Shield,
                'LineChart': LineChart,
                'Award': Award
              }
              const IconComponent = iconMap[paso.icon]

              return (
                <motion.div
                  key={paso.numero}
                  className="card-glass p-6 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Número de paso */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-${paso.color}-500/20 border-2 border-${paso.color}-500 flex items-center justify-center`}>
                    <span className={`text-lg font-bold text-${paso.color}-400`}>{paso.numero}</span>
                  </div>

                  {/* Icono */}
                  <div className={`w-14 h-14 rounded-lg bg-${paso.color}-500/20 flex items-center justify-center mb-4 ml-8`}>
                    <IconComponent className={`text-${paso.color}-400`} size={28} />
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold text-white mb-2">{paso.titulo}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className={`text-${paso.color}-400`} />
                    <span className="text-sm font-semibold text-industrial-300">{paso.timing}</span>
                  </div>

                  <p className="text-sm text-industrial-300 mb-4 leading-relaxed">
                    {paso.descripcion}
                  </p>

                  {/* Tips */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-industrial-400 uppercase tracking-wide mb-2">
                      Tips
                    </p>
                    {paso.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className={`text-${paso.color}-400 flex-shrink-0 mt-0.5`} size={14} />
                        <span className="text-xs text-industrial-400">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Timing total */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-teseo-500/20 to-tech-500/20 border border-teseo-500/30 rounded-xl">
              <p className="text-sm text-industrial-400 mb-1">Tiempo total promedio</p>
              <p className="text-3xl font-bold text-teseo-400 mb-1">25-35 días hábiles</p>
              <p className="text-xs text-industrial-300">Incluye reporte, dashboard, código fuente, presentación y sesión de Q&A</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Agendar Consulta Gratuita</span>
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section - MEJORADA */}
      <section id="metodologia" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-industrial-950/50">
        {/* Background effects */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-tech-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-teseo-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Brain className="w-16 h-16 text-teseo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Metodología <span className="glow-text">Data Science</span> Avanzada
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto mb-8">
              Stack tecnológico de última generación con modelos econométricos y machine learning
            </p>

            {/* Tech Stack Badge */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'XGBoost'].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-tech-500/20 to-teseo-500/20 border border-tech-500/30 rounded-lg"
                >
                  <span className="text-tech-400 font-semibold text-sm">{tech}</span>
                </motion.div>
              ))}
            </div>

            {/* Process badge */}
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-teseo-500/20 to-success-500/20 border border-teseo-500/30 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-teseo-400 rounded-full animate-pulse" />
              <span className="text-white font-bold text-lg">6 fases validadas con R² &gt; 0.85</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodology.map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card-glass-strong p-6 h-full hover:scale-105 transition-transform duration-300 group">
                    {/* Number badge + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${step.color}-500/20 group-hover:bg-${step.color}-500/30 transition-colors`}>
                        <span className={`text-${step.color}-400 font-bold text-xl`}>
                          {step.step}
                        </span>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-${step.color}-500/20 flex items-center justify-center`}>
                        <StepIcon className={`text-${step.color}-400`} size={24} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${step.color}-400 transition-colors`}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-industrial-300 mb-4 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Tech Stack badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {step.techs.map((tech, i) => (
                        <span key={i} className={`px-2 py-1 bg-${step.color}-500/10 border border-${step.color}-500/30 rounded text-xs text-${step.color}-400 font-mono`}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Equation si existe */}
                    {step.equation && (
                      <div className="bg-industrial-900/50 rounded-lg p-3 mb-4 border border-teseo-500/20">
                        <div className="text-xs text-teseo-400 font-mono text-center">
                          {step.equation}
                        </div>
                      </div>
                    )}

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {step.metrics.map((metric, i) => (
                        <div key={i} className={`bg-${step.color}-500/10 rounded-lg p-2 text-center`}>
                          <div className={`text-lg font-bold text-${step.color}-400`}>{metric.label}</div>
                          <div className="text-xs text-industrial-400">{metric.sublabel}</div>
                        </div>
                      ))}
                    </div>

                    {/* Sources badge */}
                    <div className={`bg-industrial-800/50 rounded-lg p-3 border border-${step.color}-500/20`}>
                      <div className="text-xs text-industrial-300 leading-relaxed">
                        {step.sources}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="card-glass p-8 text-center max-w-3xl mx-auto mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Necesitas un análisis personalizado?
            </h3>
            <p className="text-industrial-300 mb-6">
              Aplicamos esta metodología a tu industria con datos específicos y casos de uso reales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#como-funciona" className="btn-primary py-3 px-8 inline-flex items-center gap-2">
                <span>Calcular mi ROI</span>
                <ArrowRight size={18} />
              </a>
              <a href="#como-funciona" className="btn-secondary py-3 px-8">
                ver detalles
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipo - Team Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-tech-500/5 to-warning-500/5 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-tech-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Users className="w-16 h-16 text-tech-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Equipo <span className="glow-text">Multidisciplinario</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Data scientists, ingenieros y consultores sectoriales que transforman datos en decisiones estratégicas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipo.map((miembro, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-glass-strong p-6 text-center group relative"
              >
                {/* Icon background con animación */}
                <motion.div
                  className={`absolute top-0 left-0 w-full h-full bg-${miembro.color}-500/5 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                {/* Emoji icon grande con efecto hover */}
                <motion.div
                  className="text-6xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {miembro.image}
                </motion.div>

                {/* Name/Role */}
                <h3 className="text-xl font-bold text-white mb-2">{miembro.name}</h3>

                {/* Role badge */}
                <div className={`inline-block px-3 py-1 bg-${miembro.color}-500/20 border border-${miembro.color}-500/50 rounded-lg mb-3`}>
                  <span className={`text-${miembro.color}-400 font-semibold text-sm`}>
                    {miembro.role}
                  </span>
                </div>

                {/* Expertise */}
                <p className="text-sm text-industrial-300 leading-relaxed">
                  {miembro.expertise}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-tech-500/20 to-teseo-500/20 border border-tech-500/30 rounded-xl">
              <Trophy className="w-6 h-6 text-tech-400" />
              <span className="text-white font-semibold">18+ años de experiencia combinada en data science y consultoría estratégica</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alianzas y Reconocimientos Section */}
      <section className="py-20 px-4 bg-industrial-950/50 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-warning-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Award className="w-16 h-16 text-warning-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Alianzas <span className="glow-text">Estratégicas</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Colaboraciones con líderes industriales que validan nuestra experiencia y metodología
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {alianzas.map((alianza, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="card-glass-strong p-8 relative group"
              >
                {/* Badge */}
                <div className={`absolute -top-3 right-6 px-4 py-1 bg-${alianza.color}-500 rounded-full`}>
                  <span className="text-white text-xs font-bold">{alianza.badge}</span>
                </div>

                {/* Icon grande */}
                <div className="text-7xl mb-6 text-center group-hover:scale-110 transition-transform">
                  {alianza.icon}
                </div>

                {/* Name */}
                <h3 className={`text-2xl font-bold text-${alianza.color}-400 mb-2 text-center`}>
                  {alianza.name}
                </h3>

                {/* Full name */}
                <p className="text-sm text-white font-semibold mb-4 text-center">
                  {alianza.fullName}
                </p>

                {/* Description */}
                <p className="text-sm text-industrial-300 mb-6 leading-relaxed text-center">
                  {alianza.description}
                </p>

                {/* Projects list */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-industrial-400 uppercase tracking-wide mb-3">
                    Proyectos Destacados
                  </p>
                  {alianza.projects.map((project, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className={`text-${alianza.color}-400 flex-shrink-0 mt-0.5`} size={14} />
                      <span className="text-xs text-industrial-400">{project}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges footer */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-wrap gap-6 justify-center items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-warning-400">3+</div>
                <div className="text-sm text-industrial-400">Alianzas Estratégicas</div>
              </div>
              <div className="h-8 w-px bg-industrial-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-400">4+</div>
                <div className="text-sm text-industrial-400">Eventos Nacionales</div>
              </div>
              <div className="h-8 w-px bg-industrial-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-teseo-400">+3M</div>
                <div className="text-sm text-industrial-400">Data Points Presentados</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Sources Section - MEJORADA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Database className="w-16 h-16 text-teseo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ecosistema de <span className="glow-text">Fuentes de Datos</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Acceso a las bases de datos más confiables del ecosistema mexicano e internacional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-glass-strong p-5 text-center group"
              >
                {/* Emoji Icon grande */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {source.icon}
                </div>

                {/* Nombre */}
                <p className={`text-base text-${source.color}-400 font-bold mb-2`}>
                  {source.name}
                </p>

                {/* Full name */}
                <p className="text-xs text-white font-semibold mb-2">
                  {source.fullName}
                </p>

                {/* Description */}
                <p className="text-xs text-industrial-400 leading-relaxed">
                  {source.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats footer */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-teseo-400">50+</div>
                <div className="text-sm text-industrial-400">Fuentes de Datos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-400">3M+</div>
                <div className="text-sm text-industrial-400">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-400">100%</div>
                <div className="text-sm text-industrial-400">Validación Cruzada</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning-400">18+</div>
                <div className="text-sm text-industrial-400">Años de Experiencia</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestras <span className="glow-text">Divisiones</span>
            </h2>
            <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
              Verticales especializadas que aplican nuestra experiencia en sectores específicos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {divisions.map((division, index) => {
              const Icon = division.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={division.action}
                  className="card-glass-strong p-12 text-center cursor-pointer group hover:scale-105 transition-transform"
                >
                  <div className={`w-20 h-20 rounded-3xl bg-${division.color}-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`text-${division.color}-400`} size={40} />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">
                    {division.name}
                  </h3>
                  <p className="text-lg text-industrial-400 mb-4">
                    {division.tagline}
                  </p>
                  <p className="text-industrial-300 mb-6 max-w-xl mx-auto">
                    {division.description}
                  </p>

                  <motion.button
                    className="btn-primary inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explorar DatAlpine</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Preguntas <span className="glow-text">Frecuentes</span>
            </h2>
            <p className="text-xl text-industrial-300">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-glass-strong"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-teseo-400 flex-shrink-0 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>

                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-industrial-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
                <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                >
                <p className="text-industrial-400 mb-4">¿No encuentras la respuesta que buscas?</p>
                <motion.a
                  onClick={() => {
                  const mensaje = encodeURIComponent(
                    "Hola, me gustaría recibir más información sobre los servicios de consultoría de Teseo Data Lab."
                  )
                  window.open(`https://wa.me/527713649201?text=${mensaje}`, '_blank')
                  }}
                  className="btn-primary px-8 py-3 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Contáctanos Directamente</span>
                  <ArrowRight size={18} />
                </motion.a>
                </motion.div>
              </div>
              </section>

              {/* Agendar Cita Section - Calendly */}
      <section id="contacto" className="py-16 px-4 bg-gradient-to-br from-tech-500/5 via-teseo-500/5 to-success-500/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Agenda tu <span className="glow-text">Consulta Gratuita</span>
            </h2>
            <p className="text-lg text-industrial-300 mb-6">
              30 minutos con nuestros expertos • Sin compromiso • Análisis inicial de viabilidad
            </p>

            {/* Calendly Button */}
            <motion.a
              href="https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teseo-500 to-tech-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teseo-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Ahora</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
