import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei'

const AnimatedSphere = () => {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        mesh.current.rotation.x = t * 0.4
        mesh.current.rotation.y = t * 0.2

        // Tiny bobbing motion
        mesh.current.position.y = Math.sin(t / 1.5) / 10
    })

    return (
        <Sphere args={[1, 100, 200]} ref={mesh} scale={2} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            <MeshDistortMaterial
                color={hovered ? "#ff2233" : "#4d0006"}
                attach="material"
                distort={0.5}
                speed={1}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    )
}

const Hero3D = () => {
    return (
        <div className="hero-3d-container">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 5]} intensity={1} color="#ff0015" />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}

export default Hero3D
