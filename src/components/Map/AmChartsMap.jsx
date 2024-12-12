import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_lang_ES from "@amcharts/amcharts4-geodata/lang/ES";

const AmChartsMap = () => {
  const chartDivRef = useRef(null);

  useEffect(() => {
    let chart = am4core.create(chartDivRef.current, am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.geodataNames = am4geodata_lang_ES;
    chart.projection = new am4maps.projections.Miller();
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartDivRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default AmChartsMap;
