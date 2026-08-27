import { useEffect, useRef } from "react";

export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | undefined;

    void import("three")
      .then((THREE) => {
        if (disposed || !canvas) return;
        try {
          const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x000000, 0);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
          );
          camera.position.z = 28;

          const count = 520;
          const positions = new Float32Array(count * 3);
          const colors = new Float32Array(count * 3);
          const purple = new THREE.Color(0x8e2e9e);
          const teal = new THREE.Color(0x0fa89a);
          const gold = new THREE.Color(0xc9a233);

          for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 70;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            const pick = Math.random();
            const c = pick > 0.66 ? purple : pick > 0.33 ? teal : gold;
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
          }

          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
          const material = new THREE.PointsMaterial({
            size: 0.16,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            sizeAttenuation: true,
          });
          const particles = new THREE.Points(geometry, material);
          scene.add(particles);

          const geos = [
            new THREE.IcosahedronGeometry(1.3, 0),
            new THREE.OctahedronGeometry(1.05, 0),
            new THREE.TetrahedronGeometry(1.15, 0),
          ];
          const shapes: Array<{
            mesh: InstanceType<typeof THREE.Mesh>;
            rot: { x: number; y: number };
            float: number;
            offset: number;
          }> = [];
          for (let i = 0; i < 5; i++) {
            const mat = new THREE.MeshBasicMaterial({
              color: i % 2 === 0 ? 0x8e2e9e : 0x0fa89a,
              wireframe: true,
              transparent: true,
              opacity: 0.22,
            });
            const mesh = new THREE.Mesh(geos[i % 3], mat);
            mesh.position.set(
              (Math.random() - 0.5) * 32,
              (Math.random() - 0.5) * 22,
              (Math.random() - 0.5) * 16 - 6,
            );
            shapes.push({
              mesh,
              rot: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.012 },
              float: 0.25 + Math.random() * 0.4,
              offset: Math.random() * Math.PI * 2,
            });
            scene.add(mesh);
          }

          let mouseX = 0;
          let mouseY = 0;
          const onMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
          };
          const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("resize", onResize);

          const tick = () => {
            const t = Date.now() * 0.0003;
            particles.rotation.y = t * 0.35;
            particles.rotation.x = Math.sin(t * 0.5) * 0.08;
            for (const s of shapes) {
              s.mesh.rotation.x += s.rot.x;
              s.mesh.rotation.y += s.rot.y;
              s.mesh.position.y += Math.sin(t * s.float + s.offset) * 0.012;
            }
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
            camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
          };
          tick();

          cleanup = () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", onResize);
            geometry.dispose();
            material.dispose();
            geos.forEach((g) => g.dispose());
            shapes.forEach((s) => {
              (s.mesh.material as InstanceType<typeof THREE.Material>).dispose();
            });
            renderer.dispose();
          };
        } catch {
          /* keep page visible if WebGL fails */
        }
      })
      .catch(() => undefined);

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
