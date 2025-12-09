// components/EasyGOMockup.jsx
import React, { useEffect, useRef } from "react";
import 'leaflet/dist/leaflet.css';

export default function EasyGOMockup({ setScreen, onLogout, destination }) {
  const center = [42.874621, 74.570740];
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      // Проверяем доступность ref
      if (!mapRef.current) return;
      
      try {
        const L = await import('leaflet');
        
        if (!mapInstance.current) {
          // Инициализируем карту
          mapInstance.current = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: true,
            touchZoom: true,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            maxBounds: [[42.80, 74.40], [42.95, 74.70]],
            maxBoundsViscosity: 1.0
          }).setView(center, 16);

          // Добавляем слой карты
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 13,
          }).addTo(mapInstance.current);

          // Маркер текущего местоположения
          L.circle(center, {
            radius: 50,
            color: '#AE00FF',
            fillColor: '#AE00FF',
            fillOpacity: 0.7,
            weight: 3
          }).addTo(mapInstance.current);

          // Если выбран пункт назначения, добавляем маркер
          if (destination && destination.coords) {
            L.marker(destination.coords, {
              icon: L.divIcon({
                html: `<div style="background-color: #00FF88; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
                iconSize: [26, 26],
                className: 'destination-marker'
              })
            }).addTo(mapInstance.current)
              .bindPopup(`<b>${destination.name}</b><br>${destination.address}`);
          }

          // Блокируем скроллинг страницы
          const mapElement = mapRef.current;
          mapElement.addEventListener('mousewheel', (e) => {
            e.preventDefault();
          }, { passive: false });
          
          mapElement.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
              e.preventDefault();
            }
          }, { passive: false });
        }
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [destination]);

  // Функции для управления масштабом
  const zoomIn = () => {
    if (mapInstance.current) {
      const currentZoom = mapInstance.current.getZoom();
      if (currentZoom < 19) {
        mapInstance.current.zoomIn();
      }
    }
  };

  const zoomOut = () => {
    if (mapInstance.current) {
      const currentZoom = mapInstance.current.getZoom();
      if (currentZoom > 13) {
        mapInstance.current.zoomOut();
      }
    }
  };

  return (
    <div 
      className="h-screen bg-white flex flex-col relative overflow-hidden"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        touchAction: 'none'
      }}
    >
      {/* Контейнер для карты */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 z-0" 
        style={{ 
          width: '100%', 
          height: '100%',
          touchAction: 'none'
        }}
      />
      
      {/* Затемнение для лучшей читаемости */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none z-10" />

      {/* Контент поверх карты */}
      <div className="relative z-20 bg-transparent pt-8 px-0">
        {/* Логотип EasyGo! */}
        <div className="mb-4 pl-6">
          <div 
            className="text-black flex items-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "1",
              letterSpacing: "-1px",
              width: "350px",
              height: "50px"
            }}
            translate="no"
          >
            Easy<span style={{ color: "#AE00FF" }}>Go!</span>
          </div>
        </div>

        {/* Баннер скидки */}
        <div className="mb-6 relative" style={{ marginLeft: "0" }}>
          <div 
            className="text-white shadow-lg relative flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #D06CFF 0%, #AE00FF 100%)',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
              marginLeft: '0',
              position: 'relative',
              left: '0',
              width: '150px',
              height: '84px',
              padding: '16px 12px 20px 12px'
            }}
          >
            {/* Декоративный элемент для заостренного угла */}
            <div 
              className="absolute left-0 top-0 w-0 h-0"
              style={{
                borderTop: '21px solid transparent',
                borderLeft: '8px solid white',
                borderBottom: '21px solid transparent',
                transform: 'translateX(-8px)',
              }}
            />
            
            {/* Весь текст баннера */}
            <div 
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '14px',
                lineHeight: '18px',
                width: '100%',
                marginBottom: '12px'
              }}
            >
              Скидка 20% на первую поездку
            </div>
            
            {/* Промокод */}
            <div 
              className="bg-black text-white rounded-full text-center"
              style={{
                width: '75px',
                height: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                borderRadius: '12.5px',
                fontSize: '12px',
                marginLeft: '0',
                marginRight: 'auto'
              }}
            >
              EASYGO25
            </div>
          </div>
        </div>
      </div>

      {/* Кастомные кнопки масштабирования (+/-) */}
      <div className="absolute right-4 bottom-40 z-30 flex flex-col gap-2">
        {/* Кнопка увеличения (+) */}
        <button
          onClick={zoomIn}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Кнопка уменьшения (-) */}
        <button
          onClick={zoomOut}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Кнопка "Куда едем?" */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ bottom: "110px" }}>
        <button
          onClick={() => setScreen("destination")}
          className="text-white hover:opacity-90 active:opacity-80 transition-all duration-200 shadow-2xl flex items-center justify-center gap-3"
          style={{
            width: "220px",
            height: "60px",
            backgroundColor: "#AE00FF",
            borderRadius: "30px",
            padding: "0 20px",
            fontSize: "18px",
            boxShadow: "0 12px 30px rgba(174, 0, 255, 0.35)",
            letterSpacing: "-0.2px",
            fontWeight: 600
          }}
        >
          <div className="flex items-center justify-center" style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#A100F5",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5L20.5 19l-5-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"/>
            </svg>
          </div>
          <span>Куда едем?</span>
        </button>
      </div>

      {/* Если выбран пункт назначения, показываем информацию */}
      {destination && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-30">
          <div 
            className="bg-white rounded-xl p-4 shadow-2xl flex items-center gap-3 min-w-[280px]"
            style={{
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
            }}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">📍</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{destination.name}</p>
              <p className="text-sm text-gray-600">{destination.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Встроенные стили */}
      <style jsx="true">{`
        .leaflet-control-zoom {
          display: none !important;
        }
        .leaflet-control-attribution {
          display: none !important;
        }
        .leaflet-bottom {
          display: none !important;
        }
        
        /* Маркер пункта назначения */
        .destination-marker {
          background: transparent !important;
          border: none !important;
        }
        
        /* Блокировка скроллинга страницы */
        body {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        /* Блокировка жестов на телефонах */
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
      `}</style>
    </div>
  );
}