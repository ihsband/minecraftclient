import * as THREE from "three";

class DistanceBasedFog {
    constructor(game) {
        this.game = game;
        this.view = new THREE.Vector3();
        this.farnear = new THREE.Vector2();
        this.color = new THREE.Vector4();
    }

    update() {
        this.view
            .copy(this.game.camera.position)
            .applyMatrix4(this.game.camera.matrixWorldInverse);
    }

    addShaderToMaterial(material) {
        material.onBeforeCompile = (shader) => {
            shader.uniforms.u_viewPos = {
                value: this.view,
            };
            shader.uniforms.u_fogColor = {
                value: this.color,
            };
            shader.uniforms.u_farnear = {
                value: this.farnear,
            };
            shader.fragmentShader = [
                "uniform vec3 u_viewPos;",
                "uniform vec4 u_fogColor;",
                "uniform vec2 u_farnear;",
                shader.fragmentShader,
            ].join("\n");
            shader.fragmentShader = shader.fragmentShader.replace(
                "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
                [
                    "float dist=length(u_viewPos-vViewPosition);",
                    "float fogAmount = smoothstep(u_farnear.x, u_farnear.y, dist);",
                    "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
                    "gl_FragColor = mix(gl_FragColor,u_fogColor,max(0.1,fogAmount));",
                ].join("\n")
            );
            shader.vertexShader = [
                "uniform float time;",
                "uniform mat4 u_worldView;",
                "attribute vec4 a_position;",
                shader.vertexShader,
            ].join("\n");
            shader.vertexShader = shader.vertexShader.replace(
                "#include <fog_vertex>",
                [
                    "vec4 vViewPosition4 = modelViewMatrix * vec4(position, 1);",
                    "vViewPosition = vViewPosition4.xyz;",
                ].join("\n")
            );
        };
    }
}

export { DistanceBasedFog };
