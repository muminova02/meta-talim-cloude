import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { suppressPermissionErrors } from "../../utils/permissionHandler";
// GLTF loader will be imported dynamically

interface ThreeDAnimationProps {
  modelUrl?: string;
}

const ThreeDAnimation: React.FC<ThreeDAnimationProps> = ({
  modelUrl = "/models/solar_system_animation.glb",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState(true);
  const [cameraPosition, setCameraPosition] = useState("default");
  const cameraRef = useRef<THREE.Camera | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(0.0001);

  useEffect(() => {
    // Suppress permission errors for 3D content
    suppressPermissionErrors();

    // Check if model exists
    const checkModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(modelUrl);
        if (!response.ok) {
          throw new Error(
            `3D model not found. Please ensure ${modelUrl} is in public/models/ folder`
          );
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading model:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };

    checkModel();
  }, [modelUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-spin">🌌</div>
          <h2 className="text-2xl font-bold mb-2">
            Quyosh sistemasi yuklanmoqda
          </h2>
          <p className="text-lg opacity-80">Iltimos, kuting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">
            Model yuklanishida xatolik
          </h2>
          <p className="text-lg opacity-80">{error}</p>
          <p className="text-sm opacity-60 mt-2">
            Iltimos, solar_system_animation.glb fayl public/models/ papkasida
            ekanligini tekshiring
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* React Three Fiber Canvas */}
      <Canvas
        camera={{ position: [0, 15, 25], fov: 60 }}
        shadows
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl, camera }) => {
          cameraRef.current = camera;
          // Handle WebGL context loss
          gl.getContext().canvas.addEventListener(
            "webglcontextlost",
            (event) => {
              console.warn("WebGL context lost, attempting to restore...");
              event.preventDefault();
            }
          );

          gl.getContext().canvas.addEventListener(
            "webglcontextrestored",
            () => {
              console.log("WebGL context restored");
            }
          );
        }}
        onPointerMissed={() => setSelectedPlanet(null)}
      >
        {/* Lighting - optimized for material rendering */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.8}
          color="#ffffff"
        />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffd700" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />

        {/* Stars Background - faqat solar system uchun */}
        {modelUrl.includes("solar_system") && (
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        )}

        {/* Solar System Model */}
        <SolarSystemModel
          selectedPlanet={selectedPlanet}
          onPlanetSelect={setSelectedPlanet}
          showOrbits={showOrbits}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          cameraRef={cameraRef}
          modelUrl={modelUrl}
        />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={100}
          maxPolarAngle={Math.PI}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* UI Controls - faqat solar system uchun */}
      {modelUrl.includes("solar_system") && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-blur-sm z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Sayyoralar</h3>
            <button
              onClick={() => setShowOrbits(!showOrbits)}
              className="text-sm px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              {showOrbits ? "Yashir" : "Ko'rsat"}
            </button>
          </div>

          <div className="space-y-2 mb-3">
            {[
              "Sun",
              "Mercury",
              "Venus",
              "Earth",
              "Mars",
              "Jupiter",
              "Saturn",
              "Uranus",
              "Neptune",
            ].map((planet) => (
              <button
                key={planet}
                onClick={() => setSelectedPlanet(planet)}
                className={`planet-button block w-full text-left px-3 py-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors ${
                  selectedPlanet === planet ? "bg-blue-600 text-white" : ""
                }`}
              >
                {planet}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedPlanet(null)}
            className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors text-sm"
          >
            Umumiy ko'rinish
          </button>

          {/* Animation Speed Control */}
          <div className="mt-3 pt-3 border-t border-gray-600">
            <label className="block text-sm font-medium mb-2">
              Animatsiya tezligi
            </label>
            <input
              type="range"
              min="0.0001"
              max="0.5"
              step="0.001"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">
              {Math.round(animationSpeed * 1000) / 10}% tezlik
            </div>
          </div>
        </div>
      )}

      {/* Selected Planet Info - faqat solar system uchun */}
      {modelUrl.includes("solar_system") && selectedPlanet && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-blur-sm max-w-xs z-10">
          <h4 className="text-lg font-bold mb-2">{selectedPlanet}</h4>
          <p className="text-sm opacity-80">
            {selectedPlanet === "Sun" &&
              "Quyosh - Quyosh sistemasining markazi"}
            {selectedPlanet === "Mercury" &&
              "Merkuriy - Eng yaqin va eng kichik sayyora"}
            {selectedPlanet === "Venus" && "Venera - Yerga eng yaqin sayyora"}
            {selectedPlanet === "Earth" &&
              "Yer - Yagona hayot mavjud bo'lgan sayyora"}
            {selectedPlanet === "Mars" && "Mars - Qizil sayyora"}
            {selectedPlanet === "Jupiter" && "Yupiter - Eng katta sayyora"}
            {selectedPlanet === "Saturn" && "Saturn - Halqalari bilan mashhur"}
            {selectedPlanet === "Uranus" && "Uran - Yan tomonga egilgan"}
            {selectedPlanet === "Neptune" && "Neptun - Eng uzoq sayyora"}
          </p>
        </div>
      )}

      {/* Status Indicator */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg backdrop-blur-sm z-10">
        <span className="text-sm">✅ 3D Model tayyor</span>
      </div>
    </div>
  );
};

// Solar System Model Component with GLB Model
const SolarSystemModel = React.memo(
  ({
    selectedPlanet,
    onPlanetSelect,
    showOrbits,
    animationSpeed,
    setAnimationSpeed,
    cameraRef,
    modelUrl,
  }: {
    selectedPlanet: string | null;
    onPlanetSelect: (planet: string) => void;
    showOrbits: boolean;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    cameraRef: React.RefObject<THREE.Camera | null>;
    modelUrl: string;
  }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);
    const [modelError, setModelError] = useState<string | null>(null);

    // Load the GLB model with animations
    const { scene, animations } = useGLTF(modelUrl);

    // Animation mixer for GLB animations
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    // Memoize scene to prevent unnecessary re-renders
    const memoizedScene = useMemo(() => scene, [scene]);

    // Fix material extensions after model loads
    useEffect(() => {
      if (memoizedScene) {
        console.log("=== FIXING MATERIALS ===");
        memoizedScene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  // Force texture reload
                  mat.needsUpdate = true;
                  if (mat.map) {
                    mat.map.needsUpdate = true;
                    console.log("Texture map found:", mat.map);
                  } else {
                    console.log(
                      "No texture map found for material:",
                      mat.name || "unnamed"
                    );
                    // Try to set a default color if no texture
                    if (
                      mat.color.r === 1 &&
                      mat.color.g === 1 &&
                      mat.color.b === 1
                    ) {
                      mat.color.setHex(0x8b4513); // Brown color for dinosaur
                      console.log("Set default brown color for dinosaur");
                    }
                  }
                  if (mat.normalMap) {
                    mat.normalMap.needsUpdate = true;
                    console.log("Normal map found:", mat.normalMap);
                  }
                  if (mat.roughnessMap) {
                    mat.roughnessMap.needsUpdate = true;
                    console.log("Roughness map found:", mat.roughnessMap);
                  }
                  console.log(
                    "Fixed material:",
                    mat.name || "unnamed",
                    "color:",
                    mat.color,
                    "map:",
                    mat.map
                  );
                }
              });
            } else if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.needsUpdate = true;
              if (child.material.map) {
                child.material.map.needsUpdate = true;
                console.log("Texture map found:", child.material.map);
              } else {
                console.log(
                  "No texture map found for material:",
                  child.material.name || "unnamed"
                );
                // Try to set a default color if no texture
                if (
                  child.material.color.r === 1 &&
                  child.material.color.g === 1 &&
                  child.material.color.b === 1
                ) {
                  child.material.color.setHex(0x8b4513); // Brown color for dinosaur
                  console.log("Set default brown color for dinosaur");
                }
              }
              if (child.material.normalMap) {
                child.material.normalMap.needsUpdate = true;
                console.log("Normal map found:", child.material.normalMap);
              }
              if (child.material.roughnessMap) {
                child.material.roughnessMap.needsUpdate = true;
                console.log(
                  "Roughness map found:",
                  child.material.roughnessMap
                );
              }
              console.log(
                "Fixed material:",
                child.material.name || "unnamed",
                "color:",
                child.material.color,
                "map:",
                child.material.map
              );
            }
          }
        });
      }
    }, [memoizedScene]);

    // Show error if model failed to load
    if (modelError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-lg mb-2">3D Model yuklanmadi</p>
            <p className="text-sm text-gray-400">{modelError}</p>
            <p className="text-xs text-gray-500 mt-2">Fayl yo'li: {modelUrl}</p>
          </div>
        </div>
      );
    }

    // Enable shadows and setup the model
    useEffect(() => {
      if (memoizedScene) {
        console.log("=== SETUP: Setting up scene objects ===");
        let clickableCount = 0;

        memoizedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Fix material properties for better rendering
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.needsUpdate = true;
                    if (mat.map) {
                      mat.map.needsUpdate = true;
                      console.log("Material setup - Texture map:", mat.map);
                    }
                    console.log(
                      "Material setup:",
                      mat.name || "unnamed",
                      "color:",
                      mat.color,
                      "map:",
                      mat.map
                    );
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.needsUpdate = true;
                  console.log(
                    "Material setup - Texture map:",
                    child.material.map
                  );
                }
                console.log(
                  "Material setup:",
                  child.material.name || "unnamed",
                  "color:",
                  child.material.color,
                  "map:",
                  child.material.map
                );
              }
            }

            // Make all meshes clickable for now
            child.userData.clickable = true;
            child.userData.planetName = child.name;

            // Try to identify planets by name patterns
            let standardName = null;
            const name = child.name.toLowerCase();

            if (name.includes("sun") || name.includes("53"))
              standardName = "Sun";
            else if (name.includes("mercury") || name.includes("merkur"))
              standardName = "Mercury";
            else if (name.includes("venus") || name.includes("venera"))
              standardName = "Venus";
            else if (
              name.includes("earth") ||
              name.includes("yer") ||
              name.includes("52")
            )
              standardName = "Earth";
            else if (name.includes("mars") || name.includes("54"))
              standardName = "Mars";
            else if (
              name.includes("jupiter") ||
              name.includes("yupiter") ||
              name.includes("56")
            )
              standardName = "Jupiter";
            else if (
              name.includes("saturn") ||
              name.includes("saturn") ||
              name.includes("58")
            )
              standardName = "Saturn";
            else if (
              name.includes("uranus") ||
              name.includes("uran") ||
              name.includes("60")
            )
              standardName = "Uranus";
            else if (
              name.includes("neptune") ||
              name.includes("neptun") ||
              name.includes("62")
            )
              standardName = "Neptune";
            else if (name.includes("pluto") || name.includes("42"))
              standardName = "Pluto";

            if (standardName) {
              child.userData.standardName = standardName;
              clickableCount++;
              console.log("Made clickable:", child.name, "->", standardName);
            } else {
              console.log(
                "Unknown object:",
                child.name,
                "Type:",
                child.type,
                "Full name:",
                child.name
              );
            }
          }
        });

        console.log(`=== SETUP: Made ${clickableCount} objects clickable ===`);

        // Setup animation mixer if animations exist
        if (animations && animations.length > 0) {
          console.log("Found GLB animations:", animations.length);
          try {
            mixerRef.current = new THREE.AnimationMixer(memoizedScene);

            // Play all animations with slower speed
            animations.forEach((clip) => {
              console.log("Playing animation:", clip.name);
              const action = mixerRef.current!.clipAction(clip);
              // Set animation speed dynamically
              action.timeScale = animationSpeed;
              action.play();
            });
          } catch (error) {
            console.warn("Animation mixer setup failed:", error);
          }
        } else {
          console.log("No GLB animations found, using custom animation");
        }
      }
    }, [memoizedScene, animations]);

    // Update animation speed when it changes
    useEffect(() => {
      if (mixerRef.current && animations && animations.length > 0) {
        animations.forEach((clip) => {
          const action = mixerRef.current!.clipAction(clip);
          if (action.isRunning()) {
            action.timeScale = animationSpeed;
          }
        });
      }
    }, [animationSpeed, animations]);

    // Handle planet clicks and camera movement
    useEffect(() => {
      console.log("Camera effect triggered:", {
        selectedPlanet,
        cameraRef: !!cameraRef?.current,
        memoizedScene: !!memoizedScene,
      });

      if (selectedPlanet && cameraRef?.current) {
        console.log("Looking for planet:", selectedPlanet);

        // Find the selected planet in the scene
        let targetPosition = null;
        let foundPlanet = null;

        memoizedScene.traverse((child) => {
          if (child.userData.clickable) {
            console.log(
              "Found clickable object:",
              child.name,
              "standardName:",
              child.userData.standardName
            );
            if (child.userData.standardName === selectedPlanet) {
              targetPosition = child.getWorldPosition(new THREE.Vector3());
              foundPlanet = child;
              console.log(
                "Found target planet:",
                selectedPlanet,
                "at position:",
                targetPosition
              );
            }
          }
        });

        if (targetPosition && foundPlanet) {
          console.log("Moving camera to planet:", selectedPlanet);

          // Move camera to the planet
          const distance = 8; // Distance from planet
          const offset = new THREE.Vector3(distance, distance * 0.5, distance);

          // Animate camera movement
          const startPosition = cameraRef.current.position.clone();
          const endPosition = targetPosition.clone().add(offset);

          console.log("Camera movement:", {
            start: startPosition,
            end: endPosition,
          });

          let progress = 0;
          const animateCamera = () => {
            progress += 0.02;
            if (progress <= 1) {
              cameraRef.current!.position.lerpVectors(
                startPosition,
                endPosition,
                progress
              );
              cameraRef.current!.lookAt(targetPosition);
              requestAnimationFrame(animateCamera);
            }
          };
          animateCamera();
        } else {
          console.log("Planet not found or no target position");
        }
      } else if (
        !selectedPlanet &&
        cameraRef?.current &&
        modelUrl.includes("solar_system")
      ) {
        console.log("Returning to default view");

        // Return to default view
        const defaultPosition = new THREE.Vector3(0, 15, 25);
        const startPosition = cameraRef.current.position.clone();

        let progress = 0;
        const animateCamera = () => {
          progress += 0.02;
          if (progress <= 1) {
            cameraRef.current!.position.lerpVectors(
              startPosition,
              defaultPosition,
              progress
            );
            cameraRef.current!.lookAt(0, 0, 0);
            requestAnimationFrame(animateCamera);
          }
        };
        animateCamera();
      } else {
        console.log("Camera or scene not ready:", {
          selectedPlanet,
          cameraRef: !!cameraRef?.current,
          memoizedScene: !!memoizedScene,
        });
      }
    }, [selectedPlanet, cameraRef, memoizedScene]);

    // Animation loop for the GLB model
    useEffect(() => {
      let animationId: number;
      const animate = (currentTime: number) => {
        if (groupRef.current) {
          timeRef.current = currentTime * 0.001;

          // Update GLB animations if they exist
          if (mixerRef.current) {
            try {
              mixerRef.current.update(timeRef.current);
            } catch (error) {
              console.warn("Animation update failed:", error);
            }
          }

          // Only apply custom animations if no GLB animations exist
          if (!mixerRef.current || !animations || animations.length === 0) {
            // Rotate entire solar system
            groupRef.current.rotation.y += 0.001;

            // Animate individual planets if they exist in the model
            groupRef.current.traverse((child) => {
              if (child.name && child.name.toLowerCase().includes("planet")) {
                const planetName = child.name.toLowerCase();

                // Store original position for orbital calculations
                if (!child.userData.originalPosition) {
                  child.userData.originalPosition = {
                    x: child.position.x,
                    y: child.position.y,
                    z: child.position.z,
                  };
                }

                // Realistic planet rotation and orbital speeds based on actual astronomical data
                if (planetName.includes("mercury")) {
                  // Mercury - fastest rotation and orbit (88 Earth days)
                  child.rotation.y += 0.04; // Self rotation
                  const orbitRadius = 2;
                  const orbitSpeed = 0.8; // Fastest orbit
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("venus")) {
                  // Venus - slow rotation (243 Earth days), medium orbit (225 Earth days)
                  child.rotation.y += 0.015; // Very slow self rotation
                  const orbitRadius = 3;
                  const orbitSpeed = 0.6;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("earth")) {
                  // Earth - medium rotation (24 hours), medium orbit (365 days)
                  child.rotation.y += 0.025; // Self rotation
                  const orbitRadius = 4;
                  const orbitSpeed = 0.5;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("mars")) {
                  // Mars - medium rotation (24.6 hours), medium orbit (687 days)
                  child.rotation.y += 0.02; // Self rotation
                  const orbitRadius = 5;
                  const orbitSpeed = 0.4;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("jupiter")) {
                  // Jupiter - slow rotation (9.9 hours), slow orbit (12 years)
                  child.rotation.y += 0.012; // Self rotation
                  const orbitRadius = 6;
                  const orbitSpeed = 0.25;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("saturn")) {
                  // Saturn - slow rotation (10.7 hours), slow orbit (29 years)
                  child.rotation.y += 0.01; // Self rotation
                  const orbitRadius = 7;
                  const orbitSpeed = 0.2;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("uranus")) {
                  // Uranus - very slow rotation (17 hours), very slow orbit (84 years)
                  child.rotation.y += 0.008; // Self rotation
                  const orbitRadius = 8;
                  const orbitSpeed = 0.15;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else if (planetName.includes("neptune")) {
                  // Neptune - very slow rotation (16 hours), very slow orbit (165 years)
                  child.rotation.y += 0.006; // Self rotation
                  const orbitRadius = 9;
                  const orbitSpeed = 0.12;
                  child.position.x =
                    child.userData.originalPosition.x +
                    Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
                  child.position.z =
                    child.userData.originalPosition.z +
                    Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
                } else {
                  // Default for other planets
                  child.rotation.y += 0.015;
                }

                // Special planet tilts
                if (planetName.includes("uranus")) {
                  child.rotation.x = Math.PI / 2;
                } else if (planetName.includes("saturn")) {
                  child.rotation.x = Math.PI / 6;
                }
              }

              // Add rotation to the Sun if it exists
              if (child.name && child.name.toLowerCase().includes("sun")) {
                child.rotation.y += 0.01;
              }
            });
          }
        }
        animationId = requestAnimationFrame(animate);
      };

      animate(0);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        // Cleanup animation mixer
        if (mixerRef.current) {
          try {
            mixerRef.current.stopAllAction();
          } catch (error) {
            console.warn("Animation cleanup failed:", error);
          }
        }
      };
    }, [animations, animationSpeed]);

    return (
      <group ref={groupRef}>
        <primitive object={memoizedScene} />

        {/* Add planet labels based on actual model positions */}
        {memoizedScene &&
          (() => {
            const labels: React.ReactNode[] = [];
            memoizedScene.traverse((child) => {
              if (child instanceof THREE.Mesh && child.name) {
                const planetName = child.name;
                // Only add labels for planets, not for other objects
                if (
                  planetName.toLowerCase().includes("planet") ||
                  planetName.toLowerCase().includes("sun") ||
                  planetName.toLowerCase().includes("earth") ||
                  planetName.toLowerCase().includes("mars") ||
                  planetName.toLowerCase().includes("jupiter") ||
                  planetName.toLowerCase().includes("saturn") ||
                  planetName.toLowerCase().includes("uranus") ||
                  planetName.toLowerCase().includes("neptune") ||
                  planetName.toLowerCase().includes("mercury") ||
                  planetName.toLowerCase().includes("venus")
                ) {
                  // Get the actual position of the planet from the model
                  const position = child.getWorldPosition(new THREE.Vector3());

                  labels.push(
                    <Html
                      key={planetName}
                      position={[position.x, position.y + 2, position.z]}
                      center
                    >
                      <div
                        className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer hover:bg-opacity-90 transition-all"
                        onClick={() =>
                          onPlanetSelect(
                            child.userData.standardName || planetName
                          )
                        }
                        style={{ pointerEvents: "auto" }}
                      >
                        {child.userData.standardName || planetName}
                      </div>
                    </Html>
                  );
                }
              }
            });
            return labels;
          })()}
      </group>
    );
  }
);

SolarSystemModel.displayName = "SolarSystemModel";

export default ThreeDAnimation;
