import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function CyberSphere({ position, size, color, speed = 1 }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      ref.current.rotation.y += 0.005 * speed;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.1;
    }
  });

  return (
    <mesh position={position} ref={ref} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe={true}
      />
    </mesh>
  );
}

function CyberCube({ position, size, color, speed = 1 }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005 * speed;
      ref.current.rotation.y += 0.01 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh position={position} ref={ref} castShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingText({ position, text, color }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    }
  });
  
  return (
    <group position={position} ref={ref}>
      <Text
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

function Grid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.15) % 1;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[30, 30, "#0EA5E9", "#0EA5E9"]} position={[0, -2, 0]} />
      <gridHelper args={[30, 30, "#D946EF", "#D946EF"]} position={[0, -2, -1]} />
      <gridHelper args={[30, 30, "#8B5CF6", "#8B5CF6"]} position={[0, -2, -2]} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={60} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
      />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#D946EF" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#0EA5E9" />
      
      <Grid />
      
      <Float speed={2} floatIntensity={2}>
        <CyberSphere position={[-2, 0.5, -1]} size={0.7} color="#D946EF" speed={0.8} />
      </Float>
      
      <Float speed={1.5} floatIntensity={1.5}>
        <CyberCube position={[2, 0, 0]} size={1} color="#0EA5E9" speed={1.2} />
      </Float>
      
      <Float speed={1} floatIntensity={1}>
        <CyberSphere position={[0, 2, -2]} size={0.5} color="#8B5CF6" speed={1.5} />
      </Float>
      
      <FloatingText position={[0, 0, 0]} text="QUBITX-GLBM 2025" color="#ffffff" />
      <FloatingText position={[0, -0.7, 0]} text="24Hour HACKATHON" color="#22D3EE" />
    </>
  );
}

const HeroScene = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[500px] bg-cyber-dark" />;
  }

  return (
    <div className="h-[500px] md:h-[700px] relative scene-container">
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-transparent to-cyber-darker">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 relative">
            <span className="relative inline-block text-cyan-300 cyber-glow">
              QUBITX-GLBM 2025
              <span className="absolute inset-0 bg-circuit-pattern mix-blend-overlay opacity-70"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            The ultimate futuristic hackathon experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-bold rounded-md transition-all shadow-neon-purple">
              Register Now
            </a>
            <a href="#about" className="px-8 py-3 bg-transparent border border-neon-blue text-white hover:bg-neon-blue/10 font-bold rounded-md transition-all">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
