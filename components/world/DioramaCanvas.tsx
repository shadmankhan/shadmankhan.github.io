"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { Mesh, MeshStandardMaterial } from "three";
import * as THREE from "three";

type RoomDefinition = {
  slug: string;
  label: string;
  title: string;
  x: number;
  floorY: number;
  accent: string;
  wall: string;
};

function createRoomLabelTexture(label: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 144;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "#fffdf7";
    context.strokeStyle = accent;
    context.lineWidth = 5;
    context.shadowColor = "rgba(36, 29, 54, .14)";
    context.shadowBlur = 12;
    context.beginPath();
    context.roundRect(5, 7, 502, 130, 64);
    context.fill();
    context.stroke();

    const arrow = "↗";
    context.font = "700 42px Arial, sans-serif";
    const labelWidth = Math.min(context.measureText(label).width, 360);
    const startX = (512 - labelWidth - 48) / 2;
    context.shadowBlur = 0;
    context.fillStyle = "#352847";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(label, startX, 72, 360);
    context.font = "700 36px Arial, sans-serif";
    context.fillStyle = accent;
    context.fillText(arrow, startX + labelWidth + 18, 72, 42);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const rooms: RoomDefinition[] = [
  { slug: "studio", label: "Studio", title: "Coding studio", x: -3.9, floorY: 2.88, accent: "#716088", wall: "#e2ddea" },
  { slug: "library", label: "Library", title: "Library and research", x: -1.3, floorY: 2.88, accent: "#9b824d", wall: "#f0e9c9" },
  { slug: "arcade", label: "Arcade", title: "Game room", x: 1.3, floorY: 2.88, accent: "#bd765d", wall: "#f2ded1" },
  { slug: "journeys", label: "Journeys", title: "Travel wall", x: 3.9, floorY: 2.88, accent: "#578490", wall: "#dbeaed" },
  { slug: "music", label: "Music", title: "Music room", x: -3.9, floorY: .26, accent: "#8c7396", wall: "#ece3ef" },
  { slug: "garage", label: "Garage", title: "Garage", x: -1.3, floorY: .26, accent: "#625575", wall: "#e2dde8" },
  { slug: "garden", label: "Garden", title: "Life garden", x: 1.3, floorY: .26, accent: "#695683", wall: "#dfd7ea" },
  { slug: "about", label: "About", title: "About Shadman", x: 3.9, floorY: .26, accent: "#b66f58", wall: "#f1e2d7" },
];

function RoofGable() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-5.35, 5.3);
    shape.lineTo(0, 7.55);
    shape.lineTo(5.35, 5.3);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  return <mesh geometry={geometry} position={[0, 0, 1.48]} castShadow><meshStandardMaterial color="#dad4e2" roughness={.9} side={THREE.DoubleSide} /></mesh>;
}

function WorldRoomLink({ room, onNavigate }: { room: RoomDefinition; onNavigate: (href: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const labelTexture = useMemo(() => createRoomLabelTexture(room.label, room.accent), [room.label, room.accent]);
  const pointerOver = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; };
  const pointerOut = () => { setHovered(false); document.body.style.cursor = "auto"; };
  const floorCenter = room.floorY + 1.24;

  useEffect(() => () => labelTexture.dispose(), [labelTexture]);

  return <group>
    <mesh position={[room.x, floorCenter, 1.74]} onClick={(event) => { event.stopPropagation(); onNavigate(`/${room.slug}`); }} onPointerOver={pointerOver} onPointerOut={pointerOut}>
      <planeGeometry args={[2.45, 2.4]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
    </mesh>
    {hovered && <mesh position={[room.x, floorCenter, 1.72]}>
      <planeGeometry args={[2.42, 2.36]} />
      <meshBasicMaterial color={room.accent} transparent opacity={.12} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>}
    <mesh position={[room.x, room.floorY + .42, 2.02]} renderOrder={2}>
      <planeGeometry args={[1.7, .48]} />
      <meshBasicMaterial map={labelTexture} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  </group>;
}

function RoomDecor({ room }: { room: RoomDefinition }) {
  const y = room.floorY;
  const rug = <mesh position={[0, y + .035, .35]} receiveShadow><boxGeometry args={[1.65, .035, 1.35]} /><meshStandardMaterial color="#f7f2e5" roughness={1} /></mesh>;

  switch (room.slug) {
    case "studio":
      return <group>{rug}
        <mesh position={[0, y + .9, -.18]} castShadow><boxGeometry args={[1.45, .12, .72]} /><meshStandardMaterial color="#8f694b" roughness={.76} /></mesh>
        <mesh position={[-.55, y + .48, -.18]} castShadow><boxGeometry args={[.09, .78, .1]} /><meshStandardMaterial color="#8f694b" /></mesh>
        <mesh position={[.55, y + .48, -.18]} castShadow><boxGeometry args={[.09, .78, .1]} /><meshStandardMaterial color="#8f694b" /></mesh>
        <mesh position={[0, y + 1.42, -.48]} castShadow><boxGeometry args={[.66, .56, .08]} /><meshStandardMaterial color="#3f344f" roughness={.38} /></mesh>
        <mesh position={[0, y + 1.42, -.43]}><planeGeometry args={[.55, .43]} /><meshStandardMaterial color="#c5bbd4" emissive="#9083a2" emissiveIntensity={.22} /></mesh>
        <mesh position={[.62, y + 1.04, -.12]} castShadow><cylinderGeometry args={[.07, .08, .18, 12]} /><meshStandardMaterial color="#bd8165" /></mesh>
        <mesh position={[.62, y + 1.23, -.12]}><icosahedronGeometry args={[.12, 0]} /><meshStandardMaterial color="#817394" /></mesh>
      </group>;
    case "library":
      return <group>{rug}
        <mesh position={[0, y + 1.13, -.84]} castShadow><boxGeometry args={[1.48, 1.85, .22]} /><meshStandardMaterial color="#94704d" roughness={.78} /></mesh>
        {[y + .55, y + 1.2, y + 1.84].map((shelfY, row) => <group key={row}>
          <mesh position={[0, shelfY, -.68]}><boxGeometry args={[1.35, .055, .32]} /><meshStandardMaterial color="#694d38" /></mesh>
          {[-.48, -.2, .1, .38].map((x, i) => <mesh key={i} position={[x, shelfY + .2, -.68]} rotation={[0, 0, (i % 2 ? .035 : -.035)]} castShadow><boxGeometry args={[.18, .38 + ((i + row) % 2) * .1, .19]} /><meshStandardMaterial color={["#7e748b", "#c48a67", "#d7b866", "#78939a"][(i + row) % 4]} /></mesh>)}
        </group>)}
        <mesh position={[.59, y + .55, .28]} castShadow><dodecahedronGeometry args={[.2, 0]} /><meshStandardMaterial color="#d2ad5e" roughness={.55} /></mesh>
      </group>;
    case "arcade":
      return <group>{rug}
        <mesh position={[0, y + 1.04, -.72]} castShadow><boxGeometry args={[1.12, 1.72, .55]} /><meshStandardMaterial color="#463f4f" roughness={.65} /></mesh>
        <mesh position={[0, y + 1.35, -.425]}><planeGeometry args={[.82, .7]} /><meshStandardMaterial color="#c5b8d6" emissive="#8c7ba4" emissiveIntensity={.32} /></mesh>
        <mesh position={[0, y + .69, -.42]} castShadow><boxGeometry args={[.86, .14, .07]} /><meshStandardMaterial color="#c18465" /></mesh>
        {[-.22, .2].map((x, i) => <mesh key={i} position={[x, y + .55, -.28]}><cylinderGeometry args={[.055, .055, .045, 12]} /><meshStandardMaterial color={i ? "#d9bf75" : "#ad9fc0"} /></mesh>)}
        <mesh position={[0, y + .48, .25]} castShadow><boxGeometry args={[.88, .1, .42]} /><meshStandardMaterial color="#a27d5d" /></mesh>
      </group>;
    case "journeys":
      return <group>{rug}
        <mesh position={[0, y + 1.4, -1.77]} castShadow><boxGeometry args={[1.38, 1.3, .09]} /><meshStandardMaterial color="#f8f1dd" /></mesh>
        <mesh position={[0, y + 1.4, -1.71]}><planeGeometry args={[1.24, 1.16]} /><meshStandardMaterial color="#c8e0df" /></mesh>
        {[[ -.32, .18], [.14, .31], [.38, -.16], [-.08, -.3]].map(([x, yy], i) => <mesh key={i} position={[x, y + 1.4 + yy, -1.68]}><sphereGeometry args={[.055, 10, 8]} /><meshStandardMaterial color={i % 2 ? "#bd795f" : "#655679"} emissive={i % 2 ? "#bd795f" : "#655679"} emissiveIntensity={.18} /></mesh>)}
        <mesh position={[.34, y + .54, -.1]} castShadow><sphereGeometry args={[.34, 14, 10]} /><meshStandardMaterial color="#5f9292" roughness={.66} /></mesh>
        <mesh position={[.34, y + .54, -.1]}><torusGeometry args={[.38, .025, 6, 24]} /><meshStandardMaterial color="#d7b663" /></mesh>
        <mesh position={[-.52, y + .47, .08]} castShadow><cylinderGeometry args={[.13, .16, .28, 12]} /><meshStandardMaterial color="#c28a69" /></mesh>
      </group>;
    case "music":
      return <group>{rug}
        <mesh position={[-.28, y + .56, -.28]} castShadow><boxGeometry args={[1.3, .14, .95]} /><meshStandardMaterial color="#956e4e" /></mesh>
        <mesh position={[-.28, y + .66, -.25]} castShadow><cylinderGeometry args={[.46, .46, .08, 24]} /><meshStandardMaterial color="#3f3a47" roughness={.42} /></mesh>
        <mesh position={[-.28, y + .71, -.25]}><cylinderGeometry args={[.12, .12, .02, 20]} /><meshStandardMaterial color="#d8bd73" /></mesh>
        <mesh position={[.62, y + 1.02, -.64]} rotation={[0, 0, -.12]} castShadow><capsuleGeometry args={[.18, .72, 4, 10]} /><meshStandardMaterial color="#c28768" roughness={.62} /></mesh>
        <mesh position={[.62, y + 1.64, -.64]} castShadow><sphereGeometry args={[.16, 12, 10]} /><meshStandardMaterial color="#c28768" /></mesh>
        <mesh position={[.62, y + 1.64, -.45]}><cylinderGeometry args={[.025, .025, .46, 8]} /><meshStandardMaterial color="#604e42" /></mesh>
      </group>;
    case "garage":
      return <group>{rug}
        <mesh position={[0, y + .58, -.03]} castShadow><boxGeometry args={[1.55, .42, 1.4]} /><meshStandardMaterial color="#554868" metalness={.12} roughness={.4} /></mesh>
        <mesh position={[0, y + .86, -.22]} castShadow><boxGeometry args={[.86, .38, .98]} /><meshStandardMaterial color="#665978" metalness={.12} roughness={.36} /></mesh>
        <mesh position={[0, y + .88, .28]}><boxGeometry args={[.72, .28, .035]} /><meshStandardMaterial color="#c2b9ce" roughness={.25} /></mesh>
        {[[-.46, y + .34, -.57], [.46, y + .34, -.57], [-.46, y + .34, .52], [.46, y + .34, .52]].map((p, i) => <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.17, .17, .09, 14]} /><meshStandardMaterial color="#35313a" roughness={.88} /></mesh>)}
      </group>;
    case "garden":
      return <group>{rug}
        {[-.45, .38].map((x, i) => <group key={i} position={[x, y, -.18]}>
          <mesh position={[0, .36, 0]} castShadow><cylinderGeometry args={[.21, .16, .52, 10]} /><meshStandardMaterial color={i ? "#b77b60" : "#9a7958"} /></mesh>
          <mesh position={[0, .7, 0]}><cylinderGeometry args={[.16, .04, .38, 8]} /><meshStandardMaterial color="#67587b" /></mesh>
          <mesh position={[-.18, .91, .03]} rotation={[0, 0, -.7]}><icosahedronGeometry args={[.2, 0]} /><meshStandardMaterial color="#776491" roughness={.85} /></mesh>
          <mesh position={[.17, 1.02, -.02]} rotation={[0, 0, .6]}><icosahedronGeometry args={[.23, 0]} /><meshStandardMaterial color="#8772a4" roughness={.85} /></mesh>
          <mesh position={[0, 1.2, 0]}><icosahedronGeometry args={[.2, 0]} /><meshStandardMaterial color="#b9bd71" roughness={.85} /></mesh>
        </group>)}
        <mesh position={[0, y + .32, .5]} castShadow><dodecahedronGeometry args={[.28, 0]} /><meshStandardMaterial color="#d9c178" /></mesh>
      </group>;
    default:
      return <group>{rug}
        <mesh position={[0, y + 1.25, -.9]} castShadow><boxGeometry args={[1.05, 2.1, .16]} /><meshStandardMaterial color="#a67558" roughness={.78} /></mesh>
        <mesh position={[0, y + 1.25, -.79]}><boxGeometry args={[.77, 1.86, .035]} /><meshStandardMaterial color="#e9d9bc" /></mesh>
        <mesh position={[.29, y + 1.27, -.75]}><sphereGeometry args={[.055, 10, 8]} /><meshStandardMaterial color="#d9bd6c" metalness={.3} roughness={.38} /></mesh>
        <mesh position={[-.58, y + .58, -.22]} castShadow><boxGeometry args={[.38, .75, .34]} /><meshStandardMaterial color="#f3e9d2" /></mesh>
        <mesh position={[-.58, y + .99, -.22]} castShadow><sphereGeometry args={[.26, 14, 10]} /><meshStandardMaterial color="#d4a27c" /></mesh>
        <mesh position={[-.61, y + 1.13, -.15]} castShadow><sphereGeometry args={[.2, 12, 8]} /><meshStandardMaterial color="#3b332f" /></mesh>
      </group>;
  }
}

function HouseInterior() {
  const verticalBoundaries = [-5.2, -2.6, 0, 2.6, 5.2];
  return <>
    <mesh position={[0, -.16, 0]} receiveShadow><boxGeometry args={[10.9, .32, 4.5]} /><meshStandardMaterial color="#8f755a" roughness={.82} /></mesh>
    <mesh position={[0, .07, 0]} receiveShadow castShadow><boxGeometry args={[10.7, .18, 4.35]} /><meshStandardMaterial color="#d6c29f" roughness={.9} /></mesh>
    <mesh position={[0, 2.76, 0]} receiveShadow castShadow><boxGeometry args={[10.7, .2, 4.35]} /><meshStandardMaterial color="#a47e5a" roughness={.86} /></mesh>
    {rooms.map((room) => <mesh key={`wall-${room.slug}`} position={[room.x, room.floorY + 1.25, -2.02]} receiveShadow castShadow>
      <boxGeometry args={[2.58, 2.5, .15]} /><meshStandardMaterial color={room.wall} roughness={.92} />
    </mesh>)}
    {verticalBoundaries.map((x) => <group key={x}>
      <mesh position={[x, 2.72, 1.55]} castShadow><boxGeometry args={[.13, 5.16, .16]} /><meshStandardMaterial color="#765b45" roughness={.84} /></mesh>
      {x !== -5.2 && x !== 5.2 && <mesh position={[x, 2.72, -.72]} castShadow><boxGeometry args={[.11, 5.16, 2.55]} /><meshStandardMaterial color="#9c7b59" roughness={.86} />
      </mesh>}
    </group>)}
    <mesh position={[0, 5.37, .85]} castShadow><boxGeometry args={[10.55, .17, 1.6]} /><meshStandardMaterial color="#765b45" roughness={.84} /></mesh>
    <RoofGable />
    <mesh position={[-2.75, 6.45, 0]} rotation={[0, 0, .405]} castShadow receiveShadow><boxGeometry args={[5.85, .28, 4.95]} /><meshStandardMaterial color="#3c2c52" roughness={.78} /></mesh>
    <mesh position={[2.75, 6.45, 0]} rotation={[0, 0, -.405]} castShadow receiveShadow><boxGeometry args={[5.85, .28, 4.95]} /><meshStandardMaterial color="#45355b" roughness={.78} /></mesh>
    <mesh position={[-3.65, 6.7, -.2]} castShadow><boxGeometry args={[.68, 1.45, .68]} /><meshStandardMaterial color="#bd795f" roughness={.82} /></mesh>
    <mesh position={[-3.65, 7.46, -.2]}><boxGeometry args={[.82, .12, .82]} /><meshStandardMaterial color="#9c634e" roughness={.82} /></mesh>
  </>;
}

function SmokePuff({ offset }: { offset: number }) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    const time = (clock.getElapsedTime() * .32 + offset) % 1;
    if (mesh.current) {
      mesh.current.position.y = 7.78 + time * 1.1;
      mesh.current.position.x = -3.65 + Math.sin(time * 4 + offset * 5) * .16;
      mesh.current.scale.setScalar(.12 + time * .16);
    }
    if (material.current) material.current.opacity = (1 - time) * .32;
  });
  return <mesh ref={mesh} position={[-3.65, 7.9, -.2]}>
    <sphereGeometry args={[1, 12, 10]} />
    <meshStandardMaterial ref={material} color="#b1acb9" transparent opacity={.2} depthWrite={false} />
  </mesh>;
}

function Puppet({ animated }: { animated: boolean }) {
  const root = useRef<THREE.Group>(null);
  const waveArm = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!animated) return;
    const time = clock.getElapsedTime();
    if (root.current) root.current.position.y = -.32 + Math.sin(time * 1.45) * .035;
    if (waveArm.current) waveArm.current.rotation.z = -.78 + Math.sin(time * 2.2) * .19;
  });

  return <group ref={root} position={[-5.8, -.32, 3.3]}>
    <mesh position={[0, .62, 0]} castShadow><capsuleGeometry args={[.34, .54, 5, 12]} /><meshStandardMaterial color="#7a6d8c" roughness={.8} /></mesh>
    <mesh position={[0, 1.48, .02]} castShadow><sphereGeometry args={[.37, 18, 14]} /><meshStandardMaterial color="#c68c6a" roughness={.78} /></mesh>
    <mesh position={[-.06, 1.73, .03]} castShadow scale={[1.04, .63, .92]}><sphereGeometry args={[.39, 14, 10]} /><meshStandardMaterial color="#39332f" roughness={.95} /></mesh>
    {[-.17, -.05, .08, .2].map((x, index) => <mesh key={x} position={[x, 1.91 - Math.abs(x) * .13, .04]} castShadow><sphereGeometry args={[index % 2 ? .1 : .13, 10, 8]} /><meshStandardMaterial color="#39332f" roughness={.95} /></mesh>)}
    {[-.13, .13].map((x) => <mesh key={x} position={[x, 1.49, .34]}><sphereGeometry args={[.035, 10, 8]} /><meshStandardMaterial color="#302824" /></mesh>)}
    <mesh position={[0, 1.34, .355]}><boxGeometry args={[.14, .018, .015]} /><meshStandardMaterial color="#805545" /></mesh>
    <mesh position={[0, 1.04, .34]}><boxGeometry args={[.12, .35, .035]} /><meshStandardMaterial color="#f1e8d6" /></mesh>
    <group position={[-.37, .88, 0]} rotation={[0, 0, .48]}><mesh position={[0, -.23, 0]} castShadow><capsuleGeometry args={[.13, .48, 4, 10]} /><meshStandardMaterial color="#c68c6a" roughness={.8} /></mesh></group>
    <group ref={waveArm} position={[.37, .89, 0]} rotation={[0, 0, -.78]}><mesh position={[0, .26, 0]} castShadow><capsuleGeometry args={[.13, .5, 4, 10]} /><meshStandardMaterial color="#c68c6a" roughness={.8} /></mesh>
      <mesh position={[0, .57, .015]} castShadow><sphereGeometry args={[.17, 12, 10]} /><meshStandardMaterial color="#c68c6a" roughness={.8} /></mesh>
    </group>
    <mesh position={[-.15, .12, 0]} castShadow><capsuleGeometry args={[.12, .32, 4, 8]} /><meshStandardMaterial color="#47524b" roughness={.86} /></mesh>
    <mesh position={[.15, .12, 0]} castShadow><capsuleGeometry args={[.12, .32, 4, 8]} /><meshStandardMaterial color="#47524b" roughness={.86} /></mesh>
  </group>;
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, .8, 0]} castShadow><cylinderGeometry args={[.13, .22, 1.6, 7]} /><meshStandardMaterial color="#856347" roughness={.95} /></mesh>
    <mesh position={[0, 1.84, 0]} castShadow><icosahedronGeometry args={[.9, 1]} /><meshStandardMaterial color="#7f7291" roughness={.92} /></mesh>
    <mesh position={[-.48, 1.55, .18]} castShadow><icosahedronGeometry args={[.56, 0]} /><meshStandardMaterial color="#8c7ca2" roughness={.9} /></mesh>
    <mesh position={[.44, 1.67, -.12]} castShadow><icosahedronGeometry args={[.62, 0]} /><meshStandardMaterial color="#6e617f" roughness={.92} /></mesh>
  </group>;
}

function WorldGround() {
  return <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.38, 0]} receiveShadow><planeGeometry args={[100, 100]} /><meshStandardMaterial color="#ddd8e5" roughness={1} /></mesh>
    <mesh position={[0, -.03, .18]} receiveShadow castShadow><boxGeometry args={[11.3, .24, 4.8]} /><meshStandardMaterial color="#b7a17f" roughness={.93} /></mesh>
    {[2.9, 3.8, 4.7, 5.6].map((z, index) => <mesh key={z} position={[0, -.18, z]} receiveShadow><boxGeometry args={[1.48 - index * .08, .14, .62]} /><meshStandardMaterial color={index % 2 ? "#c9b997" : "#d6c9a9"} roughness={.98} /></mesh>)}
    <Tree position={[-7.2, -.3, -.4]} scale={1.05} /><Tree position={[7.05, -.3, -.6]} scale={1.18} />
    {[-6.1, -4.7, 4.9, 6.2].map((x, index) => <group key={x} position={[x, -.27, 2.15]}>
      <mesh position={[0, .28, 0]} castShadow><icosahedronGeometry args={[.38 + index % 2 * .08, 1]} /><meshStandardMaterial color={index % 2 ? "#8f80a5" : "#807392"} roughness={.95} /></mesh>
      <mesh position={[.28, .16, .04]} castShadow><icosahedronGeometry args={[.25, 0]} /><meshStandardMaterial color="#a091b5" roughness={.95} /></mesh>
    </group>)}
    <mesh position={[-5.1, -.13, .12]}><cylinderGeometry args={[.31, .37, .46, 12]} /><meshStandardMaterial color="#b77c61" /></mesh>
    <mesh position={[-5.1, .22, .12]}><icosahedronGeometry args={[.36, 0]} /><meshStandardMaterial color="#736586" /></mesh>
    <mesh position={[5.15, -.13, .1]}><cylinderGeometry args={[.31, .37, .46, 12]} /><meshStandardMaterial color="#b77c61" /></mesh>
    <mesh position={[5.15, .22, .1]}><icosahedronGeometry args={[.36, 0]} /><meshStandardMaterial color="#7f6e96" /></mesh>
  </>;
}

function World({ animated, onNavigate }: { animated: boolean; onNavigate: (href: string) => void }) {
  return <>
    <hemisphereLight args={["#f7f5fa", "#c5bece", 1.5]} />
    <directionalLight position={[-7, 12, 9]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-far={28} shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={12} shadow-camera-bottom={-8} />
    <directionalLight position={[8, 5, 4]} intensity={.8} color="#fff0d7" />
    <WorldGround />
    <HouseInterior />
    {rooms.map((room) => <RoomDecor key={room.slug} room={room} />)}
    {rooms.map((room) => <WorldRoomLink key={`link-${room.slug}`} room={room} onNavigate={onNavigate} />)}
    <SmokePuff offset={0} /><SmokePuff offset={.55} />
    <Puppet animated={animated} />
    <ContactShadows position={[0, -.21, .5]} opacity={.27} scale={16} blur={2.6} far={5} />
  </>;
}

export function DioramaCanvas({ onNavigate, animated, onReady }: { onNavigate: (href: string) => void; animated: boolean; onReady: () => void }) {
  return <Canvas shadows dpr={[1, 1.35]} frameloop={animated ? "always" : "demand"} camera={{ position: [12, 9, 15], fov: 36, near: .1, far: 80 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} onCreated={({ gl, camera }) => {
    gl.setClearColor("#000000", 0);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    camera.position.set(12, 9, 15);
    camera.lookAt(0, 3.25, 0);
    camera.updateProjectionMatrix();
    onReady();
  }}>
    <World animated={animated} onNavigate={onNavigate} />
  </Canvas>;
}
