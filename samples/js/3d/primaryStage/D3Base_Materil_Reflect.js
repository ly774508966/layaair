Laya3D.init(0, 0,true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();

var Vector3 = Laya.Vector3;
var cubeTexture;
var material;

var scene = Laya.stage.addChild(new Laya.Scene());

scene.shadingMode = Laya.BaseScene.PIXEL_SHADING;
var camera = (scene.addChild(new Laya.Camera( 0, 0.1, 100)));
camera.transform.translate(new Vector3(0, 0.8, 1.5));
camera.transform.rotate(new Vector3(-30, 0, 0), true, false);
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
var skyBox = new Laya.SkyBox();
camera.sky = skyBox;
camera.addComponent(CameraMoveScript);

var sprit = scene.addChild(new Laya.Sprite3D());

//可采用预加载资源方式，避免异步加载资源问题，则无需注册事件。
var mesh = Laya.Mesh.load("../../res/threeDimen/staticModel/teapot/teapot-Teapot001.lm");
var meshSprite = sprit.addChild(new Laya.MeshSprite3D(mesh));
mesh.once(Laya.Event.LOADED, null, function () {
	meshSprite.meshRender.sharedMaterials[0].once(Laya.Event.LOADED, null, function () {
		material = meshSprite.meshRender.sharedMaterials[0];
		material.albedo = new Laya.Vector4(0.0,0.0,0.0,0.0);
		material.renderMode = Laya.BaseMaterial.RENDERMODE_OPAQUEDOUBLEFACE;
		(material && cubeTexture) && (material.reflectTexture = cubeTexture);
	});
});
meshSprite.transform.localPosition = new Vector3(-0.3, 0.0, 0.0);
meshSprite.transform.localScale = new Vector3(0.5, 0.5, 0.5);
meshSprite.transform.localRotation = new Laya.Quaternion(-0.7071068, 0.0, 0.0, 0.7071068);

Laya.loader.load("../../res/threeDimen/skyBox/px.jpg,../../res/threeDimen/skyBox/nx.jpg,../../res/threeDimen/skyBox/py.jpg,../../res/threeDimen/skyBox/ny.jpg,../../res/threeDimen/skyBox/pz.jpg,../../res/threeDimen/skyBox/nz.jpg",
	Laya.Handler.create(null,function(texture){
		cubeTexture = texture;
		(material && cubeTexture) && ((meshSprite.meshRender.sharedMaterials[0]).reflectTexture = texture);
		skyBox.textureCube = texture;
	}), null, Laya.Loader.TEXTURECUBE);


Laya.timer.frameLoop(1, null, function () {
	meshSprite.transform.rotate(new Vector3(0, 0.01, 0), false);
});

